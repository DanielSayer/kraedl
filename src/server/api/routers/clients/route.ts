import createClientCommand from "../../managers/clients/createClientCommand";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { registerClientSchema } from "./clientsSchemas";

export const clientRouter = createTRPCRouter({
  create: adminProcedure
    .input(registerClientSchema)
    .mutation(async ({ ctx, input }) => {
      const businessId = ctx.session.user.businessId;
      return await createClientCommand.create(input, businessId);
    }),
});
