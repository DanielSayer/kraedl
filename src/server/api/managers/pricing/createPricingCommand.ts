import { trimString } from '../../common/helperMethods/stringHelpers'
import Result from '../../common/result'
import { Pricing } from '../../common/valueObjects/Pricing'
import pricingRepository from '../../repositories/pricingRepository'

import type { createPricingPackageSchema } from '@/lib/validations/pricing'
import type { z } from 'zod'

type CreatePricingReq = z.infer<typeof createPricingPackageSchema>

export async function createPricingCommand(
  pricingReq: CreatePricingReq,
  businessId: string,
): Promise<Result<string>> {
  const pricingResult = Pricing.TryCreate(pricingReq.name, pricingReq.price)

  if (pricingResult.IsFailure) {
    return Result.Failure(pricingResult.Error)
  }
  const pricing = pricingResult.Value

  const existingPricingModels =
    await pricingRepository.getByBusinessId(businessId)

  const existingNames = existingPricingModels.map((model) =>
    trimString(model.label),
  )

  if (existingNames.some((n) => n === trimString(pricing.Name))) {
    return Result.Failure('Pricing name must be unique')
  }

  const result = await pricingRepository.create({
    label: pricingReq.name,
    price: pricing.Price,
    businessId,
  })

  return Result.Success(result.id)
}
