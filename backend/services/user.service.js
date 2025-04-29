import User from "../model/user.model.js";

export const createUser = async ({ name, email, password, organization }) => {
  if (!name || !email || !password || !organization) {
    throw new Error("All fields are required");
  }
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }
  try {
    // const hashedPassword = await userModel.hashPassword(password);
    const user = await User.create({
      name,
      email,
      password,
      organization,
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUsers = async ({ userId }) => {
  const users = await User.find({
    _id: { $ne: userId },
  });
  return users;
};
