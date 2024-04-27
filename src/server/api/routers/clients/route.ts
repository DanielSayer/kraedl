import createClientCommand from "../../managers/clients/createClientCommand";
import getClientByIdQuery from "../../managers/clients/getClientByIdQuery";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { clientIdSchema, registerClientSchema } from "./clientsSchemas";

export const clientRouter = createTRPCRouter({
  create: adminProcedure
    .input(registerClientSchema)
    .mutation(async ({ ctx, input }) => {
      const businessId = ctx.session.user.businessId;
      return await createClientCommand.create(input, businessId);
    }),
  getById: adminProcedure
    .input(clientIdSchema)
    .query(async ({ ctx, input }) => {
      const businessId = ctx.session.user.businessId;
      const client = await getClientByIdQuery.get(input.id, businessId);
      return client;
    }),
});
