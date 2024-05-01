import { createEventCommand } from "../../managers/events/createEventCommand";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { createEventSchema } from "./eventsSchemas";

export const eventRouter = createTRPCRouter({
  create: adminProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      const businessId = ctx.session.user.businessId;
      const timezone = ctx.session.user.timezone;
      return await createEventCommand(input, businessId, timezone);
    }),
});
