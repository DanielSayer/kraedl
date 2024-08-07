import {
  createEventSchema,
  getEventsForInvoicesSchema,
  eventIdSchema,
  getEventsInRangeSchema,
  quoteBuilderSchema,
} from '@/lib/validations/events'
import { createEventCommand } from '../../managers/events/createEventCommand'
import { getEventById } from '../../managers/events/getEventById'
import { getEventsInRange } from '../../managers/events/getEventsInRange'
import { adminProcedure, createTRPCRouter } from '../../trpc'
import { getPastEventsForInvoice } from '../../managers/events/getPastEventsForInvoice'
import { saveEventCommand } from '../../managers/events/saveEventCommand'
import { fromResult } from '../../common/fromResult'

export const eventRouter = createTRPCRouter({
  create: adminProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      const timezone = ctx.session.user.timezone
      return await createEventCommand(input, ctx.businessId, timezone)
    }),
  getInRange: adminProcedure
    .input(getEventsInRangeSchema)
    .query(async ({ ctx, input }) => {
      return await getEventsInRange(input, ctx.businessId)
    }),
  getById: adminProcedure.input(eventIdSchema).query(async ({ ctx, input }) => {
    return await getEventById(
      input.id,
      input.startDate,
      input.exceptionId,
      ctx.businessId,
    )
  }),
  getPastEvents: adminProcedure
    .input(getEventsForInvoicesSchema)
    .query(async ({ ctx, input }) => {
      return await getPastEventsForInvoice(
        new Date(),
        ctx.businessId,
        input.pageSize,
        input.pageIndex,
      )
    }),
  save: adminProcedure
    .input(quoteBuilderSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await saveEventCommand(
        input,
        ctx.businessId,
        ctx.session.user.timezone,
      )
      return fromResult(result)
    }),
})
