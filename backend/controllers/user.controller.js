import { validationResult } from "express-validator";
import * as userService from "../services/user.service.js";
import userModel from "../model/user.model.js";
import Organization from "../model/organization.model.js";
import redisClient from "../services/redis.service.js";

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
