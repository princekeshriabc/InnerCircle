import User from '../model/user.model.js';

export const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
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
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}