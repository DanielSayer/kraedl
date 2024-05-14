import { z } from "zod";

export const createPricingPackageSchema = z.object({
  name: z
    .string()
    .min(1, "Package name is required.")
    .max(255, "Package name must be less than 255 characters."),
  price: z.string().min(1, "Price is required"),
});

export const bankDetailsSchema = z.object({
  accountName: z
    .string()
    .min(1, "Please provide an account name")
    .max(255, "Account name must be less than 255 characters."),
  bsb: z.string().min(6, "Incomplete BSB").max(6, "Incomplete BSB"),
  accountNumber: z
    .string()
    .min(6, "Incomplete account number")
    .max(9, "Account number has too many digits."),
});
