import { z } from 'zod';

// Define the schema using Zod
export const paymentSchema = z.object({
  amount: z.number({ required_error: "Amount is required" }),
  customer_name: z.string({ required_error: "Customer name is required" }),
  customer_email: z.string().email({ message: "Invalid email format" }),
  customer_phone: z.string({ required_error: "Customer phone number is required" })
});

export const paymentValidation = (data: object) => {
  return paymentSchema.safeParse(data);
};
