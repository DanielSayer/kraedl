import { z } from 'zod'
import { date, time } from './_generics'
import { recurrenceEnds, recurrenceFrequencies } from '@/types/recurrence'
import { eventPricingSchema } from './eventPricing'

export const createEventSchema = z.object({
  name: z.string().max(255, 'Name must be less than 255 characters').optional(),
  clientId: z.string().min(1, 'Client is required'),
  startTime: time,
  endTime: time,
  date: date,
})

export const getEventsInRangeSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
})

export const eventIdSchema = z.object({
  id: z.string(),
})

export const getEventsForInvoicesSchema = z.object({
  pageIndex: z.number(),
  pageSize: z.number(),
})

const recurrenceSchema = z.object({
  frequency: z.enum(recurrenceFrequencies),
  interval: z.number(),
  endType: z.enum(recurrenceEnds),
  after: z.number(),
  on: date.optional(),
})

export const quoteBuilderSchema = z.object({
  eventId: z.string().uuid(),
  eventPricings: z.array(eventPricingSchema),
  recurrence: recurrenceSchema,
})
export type QuoteBuilder = z.infer<typeof quoteBuilderSchema>
