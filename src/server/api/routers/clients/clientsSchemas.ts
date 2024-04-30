import { z } from "zod";

export const registerClientSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less that 256 characters"),
  email: z.string().email().max(255, "Email must be less that 256 characters"),
  phoneNumber: z
    .string()
    .regex(
      new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
      "Must be a valid phone number",
    )
    .min(8, "Must be a valid phone number")
    .max(15, "Must be a valid phone number"),
});

export type ClientRequest = z.infer<typeof registerClientSchema>;

export const clientIdSchema = z.object({
  id: z.string(),
});
