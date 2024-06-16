import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (userData: TUser) => {
  const user = await User.create(userData);
  return user.save();
};

const authenticateUser = async (
  email: string,
  password: string,
): Promise<TUser | null> => {
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
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

export const UserServices = {
  createUser,
  authenticateUser,
  getUserById,
  updateUser,
};
