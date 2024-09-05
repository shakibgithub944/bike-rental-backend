import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const getProfile = catchAsync(async (req, res) => {
  const userEmailFromToken = req?.user?.email;
  const result = await UserServices.getProfileFromDB(userEmailFromToken);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const userEmailFromToken = req?.user?.email;
  const result = await UserServices.updateProfileIntoDB(
    userEmailFromToken,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const UserControllers = {
  getProfile,
  updateProfile,
};
