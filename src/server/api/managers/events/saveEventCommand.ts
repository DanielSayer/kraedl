import type { QuoteBuilder } from '@/lib/validations/events'
import Result from '../../common/result'
import eventPricingRepository from '../../repositories/events/eventSeries/eventPricingRepository'
import { Recurrence } from '../../common/valueObjects/Recurrence'
import { format } from 'date-fns'
import { dateRangeValidatorService } from '../../services/DateRangeValidatorService'
import { TRPCClientError } from '@trpc/client'
import eventExceptionsPricingRepository from '../../repositories/events/eventExceptions/eventExceptionsPricingRepository'
import eventsRepository from '../../repositories/events/eventSeries/eventsRepository'
import eventExceptionsRepository from '../../repositories/events/eventExceptions/eventExceptionsRepository'
import type DateRange from '../../common/valueObjects/DateRange'

export async function saveEventCommand(
  req: QuoteBuilder,
  businessId: string,
  timezone: string,
): Promise<Result<boolean>> {
  const event = await eventsRepository.getById(req.eventId, businessId)
  if (!event) {
    throw new Error(`Event ${req.eventId} is not found`)
  }

  if (req.eventPricings.length === 0) {
    return Result.Failure('Event must have at least one line item')
  }

  const dateRangeResult = dateRangeValidatorService(
    req.startTime,
    req.endTime,
    req.date,
    timezone,
  )
  if (dateRangeResult.IsFailure) {
    return Result.Failure(dateRangeResult.Error)
  }
  const dateRange = dateRangeResult.Value

  const recurrenceResult = Recurrence.TryCreate(
    req.recurrence,
    format(dateRange.Start, 'yyyy-MM-dd'),
  )
  if (recurrenceResult.IsFailure) {
    return Result.Failure(recurrenceResult.Error)
  }
  const recurrence = recurrenceResult.Value
  const untilDate = recurrence.getRecurrenceEnd(dateRange.End)

  for (const pricing of req.eventPricings) {
    const computedQuantity = parseFloat(pricing.quantity)
    if (
      isNaN(computedQuantity) ||
      !isFinite(computedQuantity) ||
      computedQuantity <= 0
    ) {
      return Result.Failure('Quantity must be a positive number')
    }
  }

  switch (req.saveType) {
    case 'future':
      throw new TRPCClientError('Not implemented')
    case 'this':
      await handleThisSaveType(req, businessId, dateRange)
      break
    default:
      await handleDefaultSaveType(
        req,
        event.id,
        dateRange,
        recurrence.RecurrenceRule,
        untilDate,
      )
      break
  }

  return Result.Success(true)
}

async function handleThisSaveType(
  req: QuoteBuilder,
  businessId: string,
  dateRange: DateRange,
) {
  await eventExceptionsRepository.create({
    eventId: req.eventId,
    name: req.name,
    clientId: req.clientId,
    eventStartTime: dateRange.Start,
    startTime: dateRange.Start,
    endTime: dateRange.End,
    businessId: businessId,
  })

  await eventExceptionsPricingRepository.insertEventExceptionPricings(
    req.eventPricings,
    req.eventId,
  )
}

async function handleDefaultSaveType(
  req: QuoteBuilder,
  eventId: string,
  dateRange: DateRange,
  recurrenceRule: string,
  untilDate: Date,
) {
  await eventsRepository.updateEvent(
    req.name,
    req.clientId,
    dateRange.Start,
    dateRange.End,
    recurrenceRule,
    untilDate,
    eventId,
  )

  await eventPricingRepository.insertEventPricings(
    req.eventPricings,
    req.eventId,
  )
}
