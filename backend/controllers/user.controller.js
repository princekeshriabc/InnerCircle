import { validationResult } from "express-validator";
import * as userService from "../services/user.service.js";
import userModel from "../model/user.model.js";
import Organization from "../model/organization.model.js";
import redisClient from "../services/redis.service.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const createUserController = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, emailDomain } = req.body;

    // Checking for valid organization presence.
    const organization = await Organization.findOne({
      emailDomain: emailDomain,
    });
    console.log("Organization value:", organization);
    if (!organization) {
      // TODO: If organization is not found, redirect to "Purchase Plan" page. Will be implemented later.
      return res.status(403).json({
        success: false,
        message: "This email domain is not associated with any organization.",
      });
    }

    const user = await userService.createUser({
      name,
      email,
      password,
      organization: organization._id,
    });
    const token = await user.generateJWT();
    // Remove password from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      organization: user.organization,
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userResponse,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // Generate JWT token
    const token = await user.generateJWT();
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      organization: user.organization,
      // password:user.password,
    };

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: userResponse,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginGoogleUserController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, emailDomain } = req.body;
    const organization = await Organization.findOne({
      emailDomain: emailDomain,
    });
    if (!organization) {
      // TODO: If organization is not found, redirect to "Purchase Plan" page. Will be implemented later.
      return res.status(403).json({
        success: false,
        message: "This email domain is not associated with any organization.",
      });
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      // Create a new user if not found
      const user = await userService.createUser({ name, email, password, organization });
      const token = await user.generateJWT();
      // Remove password from response
      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        organization: user.organization,
      };

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: userResponse,
        token,
      });
    }
    // Generate JWT token
    const token = await user.generateJWT();
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      organization: organization._id,
    };

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: userResponse,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const profileController = async (req, res) => {
  // console.log(req.user);
  try {
    // const user = await userModel.findById(req.user._id).select("-password");
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    // Get the token from the request header
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    // Check if the token is valid
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    // Add the token to the blacklist in Redis
    await redisClient.set(token, "logout", "EX", 60 * 60 * 24 * 30); // Token expires in 30 days
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });

    const allUsers = await userService.getAllUsers({
      userId: loggedInUser._id,
    });

    return res.status(200).json({
      users: allUsers,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({ error: err.message });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      // To prevent enumeration, respond with success even if user not found
      return res.status(200).json({
        success: true,
        message: "If the email exists, a password reset link will be sent",
      });
    }

    // Generate reset token - a random string hashed for security or JWT
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save hashed token and expiry to user model (you need to add these fields in user model)
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour expiry
    await user.save({ validateBeforeSave: false });

    // Create reset url to send via email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Email message
    const message = `You requested a password reset. Please visit this link to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: "Password reset email sent",
      });
    } catch (err) {
      // Cleanup reset fields on email failure
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: "Email could not be sent, please try again later",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Password is required" });
  }

  // Hash token received from URL to compare to DB
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  try {
    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // Token not expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token",
      });
    }

    // Set new password and clear reset fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};