import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const registerUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  const { password, ...userWithoutPassword } = result.toObject();
  return userWithoutPassword;
};

const loginUserFromDB = async (loginInfo: TLoginUser) => {
  const user = await User.findOne({ email: loginInfo?.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isCorrectPassword = await bcrypt.compare(
    loginInfo?.password,
    user?.password
  );
  if (isCorrectPassword) {
    const jwtData = {
      id: user?.id,
      email: user?.email,
      role: user?.role,
    };
    const accessToken = jwt.sign(
      jwtData,
      config.jwt_access_token_secret as string,
      {
        expiresIn: "1d",
      }
    );

    const { password, ...userWithoutPassword } = user.toObject();

    return { token: accessToken, userWithoutPassword };
  }
  throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password");
};

export const AuthServices = {
  registerUserIntoDB,
  loginUserFromDB,
};
