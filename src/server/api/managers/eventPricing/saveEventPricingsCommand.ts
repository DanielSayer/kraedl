import type { QuoteBuilder } from '@/lib/validations/events'
import Result from '../../common/result'
import eventPricingRepository from '../../repositories/eventPricingRepository'

export async function saveEventPricingsCommand(
  req: QuoteBuilder,
): Promise<Result<boolean>> {
  if (req.eventPricings.length === 0) {
    return Result.Failure('Event must have at least one line item')
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
