import { eventIdSchema, quoteBuilderSchema } from '@/lib/validations/events'
import { fromResult } from '../../common/fromResult'
import { getEventPricingsByEventIdQuery } from '../../managers/eventPricing/getByEventIdQuery'
import { saveEventPricingsCommand } from '../../managers/eventPricing/saveEventPricingsCommand'
import { adminProcedure, createTRPCRouter } from '../../trpc'

export const eventPricingRouter = createTRPCRouter({
  getById: adminProcedure.input(eventIdSchema).query(async ({ input }) => {
    return await getEventPricingsByEventIdQuery(input.id)
  }),
  save: adminProcedure
    .input(quoteBuilderSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await saveEventPricingsCommand(input, ctx.businessId)
      return fromResult(result)
    }),
})
