import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { BookingController } from "./booking.controller";
import { BookingValidations } from "./booking.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingController.createBooking
);

router.get("/", auth(USER_ROLE.user), BookingController.getAllRentalsOfAUser);

router.put(
  "/:id/return",
  auth(USER_ROLE.admin),
  BookingController.returnBooking
);

export const BookingRoutes = router;
