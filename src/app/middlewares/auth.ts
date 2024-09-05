import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      config.jwt_access_token_secret as string,
      (err, decoded) => {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token!");
        }
        if (!decoded) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token!");
        }

        const role = (decoded as JwtPayload).role;

        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You have no access to this route"
          );
        }

        req.user = decoded as JwtPayload;
      }
    );

    next();
  });
};

export default auth;
