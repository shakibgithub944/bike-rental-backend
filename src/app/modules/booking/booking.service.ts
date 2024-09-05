import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Bike } from "../bike/bike.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (bookingData: TBooking, userId: string) => {
  const bikeId = bookingData.bikeId;
  await Bike.findByIdAndUpdate(bikeId, { isAvailable: false }, { new: true });
  const data = { ...bookingData, userId };
  const result = await Booking.create(data);
  return result;
};

const getAllRentalsOfAUserFromDB = async (userId: string) => {
  const result = await Booking.find({ userId });
  return result;
};

const returnBookingIntoDB = async (bikeId: string) => {
  const bike = await Bike.findById(bikeId);
  const booking = await Booking.findOne({ bikeId: bikeId });
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }
  const bookingTime = new Date(booking.startTime);
  const returnTime = new Date();
  const timeDiff = Number(returnTime) - Number(bookingTime);
  const covertIntoSeconds = timeDiff / 1000;
  const covertIntoHours = covertIntoSeconds / 3600;
  const totalRentalTime = covertIntoHours.toFixed(2);
  const totalCost = (
    Number(totalRentalTime) * Number(bike?.pricePerHour)
  ).toFixed(2);

  // making updated doc
  const updateDoc = {
    returnTime,
    totalCost,
    isReturned: true,
  };

  const result = await Booking.findOneAndUpdate({ bikeId }, updateDoc, {
    new: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  await Bike.findByIdAndUpdate(
    result.bikeId,
    { isAvailable: true },
    { new: true }
  );

  return result;
};

export const BookingService = {
  createBookingIntoDB,
  getAllRentalsOfAUserFromDB,
  returnBookingIntoDB,
};
