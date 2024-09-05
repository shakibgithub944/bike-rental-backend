import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const getProfileFromDB = async (userEmail: string) => {
  const result = await User.findOne({ email: userEmail });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const { password, ...userWithoutPassword } = result!.toObject();
  return userWithoutPassword;
};

const updateProfileIntoDB = async (
  userEmail: string,
  updatedData: Partial<TUser>
) => {
  const result = await User.findOneAndUpdate(
    { email: userEmail },
    updatedData,
    { new: true }
  );
  const { password, ...userWithoutPassword } = result!.toObject();
  return userWithoutPassword;
};

export const UserServices = {
  getProfileFromDB,
  updateProfileIntoDB,
};
