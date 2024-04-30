import { z } from "zod";

export const createEventSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  startTime: z.string().time().min(1, "Start time is required"),
  endTime: z.string().time().min(1, "End time is required"),
  date: z.string().datetime().min(1, "Date is required"),
});
