import { createEventCommand } from "../../managers/events/createEventCommand";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { createEventSchema } from "./eventsSchemas";

export const eventRouter = createTRPCRouter({
  create: adminProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      const businessId = ctx.session.user.businessId;
      return await createEventCommand(input, businessId);
    }),
});
