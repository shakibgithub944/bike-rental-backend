import { z } from "zod";

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    pricePerHour: z.number().positive(),
    isAvailable: z.boolean().optional(),
    cc: z.number().positive(),
    year: z.number().int().min(1900).max(new Date().getFullYear()),
    model: z.string().min(1),
    brand: z.string().min(1),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    pricePerHour: z.number().positive().optional(),
    isAvailable: z.boolean().optional(),
    cc: z.number().positive().optional(),
    year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
    model: z.string().min(1).optional(),
    brand: z.string().min(1).optional(),
  }),
});

export const BikeValidations = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
};
