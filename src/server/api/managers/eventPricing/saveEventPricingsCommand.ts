import Result from "../../common/result";
import eventPricingRepository from "../../repositories/eventPricingRepository";
import type { SaveEventPricingsRequest } from "../../routers/eventPricing/eventPricingSchemas";

export async function saveEventPricingsCommand(
  req: SaveEventPricingsRequest,
): Promise<Result<boolean>> {
  for (const pricing of req.eventPricings) {
    const computedQuantity = parseFloat(pricing.quantity);
    if (isNaN(computedQuantity) || !isFinite(computedQuantity)) {
      return Result.Failure("Invalid quantity");
    }

    if (computedQuantity <= 0) {
      return Result.Failure("Quantity must be positive");
    }
  }

  await eventPricingRepository.insertEventPricings(
    req.eventPricings,
    req.eventId,
  );

  return Result.Success(true);
}