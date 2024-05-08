import { createEventCommand } from "../../managers/events/createEventCommand";
import { getEventById } from "../../managers/events/getEventById";
import { getEventsInRange } from "../../managers/events/getEventsInRange";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import {
  createEventSchema,
  getEventByIdSchema,
  getEventsInRangeSchema,
} from "./eventsSchemas";

export const eventRouter = createTRPCRouter({
  create: adminProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      const businessId = ctx.session.user.businessId;
      const timezone = ctx.session.user.timezone;
      return await createEventCommand(input, businessId, timezone);
    }),
  getInRange: adminProcedure
    .input(getEventsInRangeSchema)
    .query(async ({ ctx, input }) => {
      const businessId = ctx.session.user.businessId;
      return await getEventsInRange(input, businessId);
    }),
  getById: adminProcedure
    .input(getEventByIdSchema)
    .query(async ({ ctx, input }) => {
      const businessId = ctx.session.user.businessId;
      return await getEventById(input.id, businessId);
    }),
});
