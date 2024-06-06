import { TRPCClientError } from '@trpc/client'
import { convertDateAndTimeToDate } from '../../common/helperMethods/dateHelpers'
import DateRange from '../../common/valueObjects/DateRange'
import eventsRepository from '../../repositories/eventsRepository'
import type { z } from 'zod'
import type { createEventSchema } from '@/lib/validations/events'

type EventRequest = z.infer<typeof createEventSchema>

export async function createEventCommand(
  request: EventRequest,
  businessId: string,
  timezone: string,
) {
  const startDate = convertDateAndTimeToDate(
    request.startTime,
    request.date,
    timezone,
  )
  const endDate = convertDateAndTimeToDate(
    request.endTime,
    request.date,
    timezone,
  )

  const dateRangeResult = DateRange.NewResult(startDate, endDate)
  if (dateRangeResult.IsFailure) {
    throw new TRPCClientError(
      `${dateRangeResult.Error} If this is intentional and multi-day events are required, please contact support`,
    )
  }
  const dateRange = dateRangeResult.Value
  return await eventsRepository.create({
    clientId: request.clientId,
    name: request.name,
    startTime: dateRange.Start,
    endTime: dateRange.End,
    businessId: businessId,
  })
}
