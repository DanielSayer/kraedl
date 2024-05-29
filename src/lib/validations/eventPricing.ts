import { z } from "zod";

export const eventPricingSchema = z.object({
  id: z.string().uuid(),
  pricingId: z.string().uuid({
    message: "Pricing name is required, either select one or remove the row.",
  }),
  quantity: z.string().refine(
    (arg) => {
      const val = parseFloat(arg);
      return !isNaN(val) && val > 0;
    },
    { message: "Quantity must be positive" },
  ),
  totalPrice: z.string(),
});

export const saveEventPricingsSchema = z.object({
  eventPricings: z.array(eventPricingSchema),
  eventId: z.string(),
});
