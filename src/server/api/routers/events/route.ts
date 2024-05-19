import {
  createEventSchema,
  currentTimeSchema,
  eventIdSchema,
  getEventsInRangeSchema,
} from "@/lib/validations/events";
import { createEventCommand } from "../../managers/events/createEventCommand";
import { getEventById } from "../../managers/events/getEventById";
import { getEventsInRange } from "../../managers/events/getEventsInRange";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { getPastEventsForInvoice } from "../../managers/events/getPastEventsForInvoice";

export const eventRouter = createTRPCRouter({
  create: adminProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      const timezone = ctx.session.user.timezone;
      return await createEventCommand(input, ctx.businessId, timezone);
    }),
  getInRange: adminProcedure
    .input(getEventsInRangeSchema)
    .query(async ({ ctx, input }) => {
      return await getEventsInRange(input, ctx.businessId);
    }),
  getById: adminProcedure.input(eventIdSchema).query(async ({ ctx, input }) => {
    return await getEventById(input.id, ctx.businessId);
  }),
  getPastEvents: adminProcedure
    .input(currentTimeSchema)
    .query(async ({ ctx, input }) => {
      return await getPastEventsForInvoice(
        new Date(input.currentTime),
        ctx.businessId,
        1,
      );
    }),
});
