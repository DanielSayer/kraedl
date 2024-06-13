import type { createEventSchema } from '@/lib/validations/events'
import { TRPCClientError } from '@trpc/client'
import type { z } from 'zod'
import eventsRepository from '../../repositories/eventsRepository'
import { dateRangeValidatorService } from '../../services/DateRangeValidatorService'

type EventRequest = z.infer<typeof createEventSchema>

export async function createEventCommand(
  request: EventRequest,
  businessId: string,
  timezone: string,
) {
  const dateRangeResult = dateRangeValidatorService(
    request.startTime,
    request.endTime,
    request.date,
    timezone,
  )
  if (dateRangeResult.IsFailure) {
    throw new TRPCClientError(
      `${dateRangeResult.Error} If this is intentional and multi-day events are required, please contact support`,
    )
  }

  const dateRange = dateRangeResult.Value
  let name = request.name
  if (!name) {
    name = 'Untitled Event'
  }

  return await eventsRepository.create({
    clientId: request.clientId,
    name: name,
    startTime: dateRange.Start,
    endTime: dateRange.End,
    businessId: businessId,
  })
}
