import { z } from "zod";

const rentalValidationSchema = z.object({
  bikeId: z.string({ required_error: "Bike ID is required" }),
  startTime: z.string().transform((val) => new Date(val)),
});

export const rentalValidation = {
  rentalValidationSchema,
};
