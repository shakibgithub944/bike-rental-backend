import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    bikeId: z.string().min(1),
    startTime: z.string(),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
