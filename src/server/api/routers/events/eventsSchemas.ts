import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().max(255, "Name must be less than 255 characters").optional(),
  clientId: z.string().min(1, "Client is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  date: z.string().date().min(1, "Date is required"),
});

export type EventRequest = z.infer<typeof createEventSchema>;
