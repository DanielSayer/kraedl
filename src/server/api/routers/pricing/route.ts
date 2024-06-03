import { createPricingPackageSchema } from '@/lib/validations/pricing'
import { fromResult } from '../../common/fromResult'
import { createPricingCommand } from '../../managers/pricing/createPricingCommand'
import { getPricingByBusinessIdQuery } from '../../managers/pricing/getPricingByBusinessIdQuery'
import { adminProcedure, createTRPCRouter } from '../../trpc'

export const pricingRouter = createTRPCRouter({
  createPricing: adminProcedure
    .input(createPricingPackageSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await createPricingCommand(input, ctx.businessId)
      return fromResult(result)
    }),
  getPricings: adminProcedure.query(async ({ ctx }) => {
    return await getPricingByBusinessIdQuery(ctx.businessId)
  }),
})
