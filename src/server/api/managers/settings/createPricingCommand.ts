import { trimString } from "../../common/helperMethods/stringHelpers";
import Result from "../../common/result";
import pricingRepository from "../../repositories/pricingRepository";
import type { CreatePricingReq } from "../../routers/settings/settingsSchemas";

export async function createPricingCommand(
  pricing: CreatePricingReq,
  businessId: string,
): Promise<Result<string>> {
  const price = parseFloat(pricing.price);
  if (isNaN(price) || !isFinite(price)) {
    return Result.Failure("Invalid price");
  }

  if (price <= 0) {
    return Result.Failure("Price must be positive");
  }

  const formattedPrice = price.toFixed(2);

  const trimmedName = trimString(pricing.name);
  if (trimmedName.length === 0) {
    return Result.Failure("Pricing name is required");
  }

  const existingPricingModels =
    await pricingRepository.getByBusinessId(businessId);

  const existingNames = existingPricingModels.map((model) =>
    trimString(model.label),
  );

  if (existingNames.some((n) => n === trimmedName)) {
    return Result.Failure("Pricing name must be unique");
  }

  const result = await pricingRepository.create({
    label: pricing.name,
    price: formattedPrice,
    businessId,
  });

  return Result.Success(result.id);
}
