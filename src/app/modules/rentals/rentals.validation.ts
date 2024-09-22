import { z } from "zod";

const rentalValidationSchema = z.object({
  bikeId: z.string({ required_error: "Bike ID is required" }),
  startTime: z.string().refine(
    (val) => {
      const parsedDate = new Date(val);
      // console.log('Parsed Start Time:', parsedDate);
      return !isNaN(parsedDate.getTime());
    },
    { message: "Invalid start time value" },
  ),
});

export const rentalValidation = {
  rentalValidationSchema,
};
