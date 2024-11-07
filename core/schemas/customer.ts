import { z } from "zod";

export const customerSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  city: z.string().min(3, "City must be at least 3 characters"),
});
