import { eventIdSchema } from '@/lib/validations/events'
import { getEventPricingsByEventIdQuery } from '../../managers/eventPricing/getByEventIdQuery'
import { adminProcedure, createTRPCRouter } from '../../trpc'

export const eventPricingRouter = createTRPCRouter({
  getById: adminProcedure.input(eventIdSchema).query(async ({ input }) => {
    return await getEventPricingsByEventIdQuery(input.id, input.exceptionId)
  }),
})
