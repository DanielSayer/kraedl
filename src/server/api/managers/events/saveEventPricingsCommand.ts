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
    if (isNaN(computedQuantity) || !isFinite(computedQuantity)) {
      return Result.Failure('Invalid quantity')
    }

    if (computedQuantity <= 0) {
      return Result.Failure('Quantity must be positive')
    }
  }

  if (!req.saveType || req.saveType === 'all') {
    await eventsRepository.updateEvent(
      req.name,
      req.clientId,
      dateRange.Start,
      dateRange.End,
      recurrence.RecurrenceRule,
      untilDate,
      event.id,
    )
    await eventPricingRepository.insertEventPricings(
      req.eventPricings,
      req.eventId,
    )
    return Result.Success(true)
  }

  if (req.saveType === 'this') {
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

    return Result.Success(true)
  }

  throw new TRPCClientError('Not implemented')
}
