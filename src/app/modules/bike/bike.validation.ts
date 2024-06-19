import { z } from "zod";

const bikeValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  description: z.string({ required_error: "Description is required" }),
  pricePerHour: z.number({ required_error: "Price per hour is required" }),
  cc: z.number({ required_error: "CC is required" }),
  year: z.number({ required_error: "Year is required" }),
  model: z.string({ required_error: "Model is required" }),
  brand: z.string({ required_error: "Brand is required" }),
  isAvailable: z.boolean().default(true),
});

export const bikeValidation = {
  bikeValidationSchema,
};
