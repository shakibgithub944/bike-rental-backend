import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingService.createBookingIntoDB(
    req.body,
    req.user.id
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental created successfully",
    data: result,
  });
});

const getAllRentalsOfAUser = catchAsync(async (req, res) => {
  const result = await BookingService.getAllRentalsOfAUserFromDB(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

const returnBooking = catchAsync(async (req, res) => {
  const result = await BookingService.returnBookingIntoDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike returned successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  returnBooking,
  getAllRentalsOfAUser,
};
