import { z } from "zod";

const eventPricingSchema = z.object({
  id: z.string().uuid(),
  pricingId: z.string().uuid({
    message: "Pricing name is required, either select one or remove the row.",
  }),
  quantity: z.string(),
});

export const saveEventPricingsSchema = z.object({
  eventPricings: z.array(eventPricingSchema),
  eventId: z.string(),
});
