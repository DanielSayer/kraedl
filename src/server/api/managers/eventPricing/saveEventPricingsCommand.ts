import type { QuoteBuilder } from '@/lib/validations/events'
import Result from '../../common/result'
import eventPricingRepository from '../../repositories/eventPricingRepository'
import { Recurrence } from '../../common/valueObjects/Recurrence'
import eventsRepository from '../../repositories/eventsRepository'
import { format } from 'date-fns'

export async function saveEventPricingsCommand(
  req: QuoteBuilder,
  businessId: string,
): Promise<Result<boolean>> {
  const event = await eventsRepository.getById(req.eventId, businessId)
  if (!event) {
    throw new Error(`Event ${req.eventId} is not found`)
  }

  if (req.eventPricings.length === 0) {
    return Result.Failure('Event must have at least one line item')
  }

  const recurrenceResult = Recurrence.TryCreate(
    req.recurrence,
    format(event.startTime, 'yyyy-MM-dd'),
  )

  if (recurrenceResult.isFailure()) {
    return Result.Failure(recurrenceResult.GetError())
  }

  for (const pricing of req.eventPricings) {
    const computedQuantity = parseFloat(pricing.quantity)
    if (isNaN(computedQuantity) || !isFinite(computedQuantity)) {
      return Result.Failure('Invalid quantity')
    }

    if (computedQuantity <= 0) {
      return Result.Failure('Quantity must be positive')
    }
  }

  await eventPricingRepository.insertEventPricings(
    req.eventPricings,
    req.eventId,
  )

  return Result.Success(true)
}
