import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

// const createUser = async (userData: TUser) => {
//   const user = await User.create(userData);
//   return user.save();
// };

const createUser = async (userData: TUser) => {
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds),
  );
  userData.password = hashedPassword;
  const user = await User.create(userData);
  return user.save();
};

const authenticateUser = async (
  email: string,
  password: string,
): Promise<TUser | null> => {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  return user;
};

const getUserById = async (userId: string): Promise<TUser | null> => {
  return User.findById(userId);
};

const updateUser = async (
  userId: string,
  updateData: Partial<TUser>,
): Promise<TUser | null> => {
  return User.findByIdAndUpdate(userId, updateData, { new: true });
};

// Admin-specific services

const getAllUsers = async (): Promise<TUser[]> => {
  return User.find();
};

const promoteUserToAdmin = async (userId: string): Promise<TUser | null> => {
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }
  user.role = "admin";
  return user.save();
};

const deleteUserById = async (userId: string): Promise<TUser | null> => {
  const result = await User.findByIdAndDelete(userId);
  return result;
};

export const UserServices = {
  createUser,
  authenticateUser,
  getUserById,
  updateUser,
  getAllUsers,
  promoteUserToAdmin,
  deleteUserById
};
