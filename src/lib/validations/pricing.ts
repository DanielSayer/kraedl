import { z } from "zod";

export const createPricingPackageSchema = z.object({
  name: z
    .string()
    .min(1, "Package name is required.")
    .max(255, "Package name must be less than 255 characters."),
  price: z.string().min(1, "Price is required"),
});
