import { z } from "zod";
import { date, time } from "./_generics";

export const createEventSchema = z.object({
  name: z.string().max(255, "Name must be less than 255 characters").optional(),
  clientId: z.string().min(1, "Client is required"),
  startTime: time,
  endTime: time,
  date: date,
});

export const getEventsInRangeSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
});

export const eventIdSchema = z.object({
  id: z.string(),
});

export const getEventsForInvoicesSchema = z.object({
  pageIndex: z.number(),
  pageSize: z.number(),
});
