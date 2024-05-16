import { z } from "zod";

const time = z
  .string()
  .regex(new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), "Invalid time");

const date = z
  .string()
  .regex(new RegExp(/^\d{4}-\d{2}-\d{2}$/), "Invalid date");

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
