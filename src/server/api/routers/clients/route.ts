import createClientCommand from "../../managers/clients/createClientCommand";
import getClientByIdQuery from "../../managers/clients/getClientByIdQuery";
import getClientsForBusinessQuery from "../../managers/clients/getClientsForBusinessQuery";
import updateClientAddressCommand from "../../managers/clients/updateClientAddressCommand";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import {
  clientAddressSchema,
  clientIdSchema,
  registerClientSchema,
} from "./clientsSchemas";

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
  getByBusiness: adminProcedure.query(async ({ ctx }) => {
    const businessId = ctx.session.user.businessId;
    return await getClientsForBusinessQuery.get(businessId);
  }),
  updateClientAddress: adminProcedure
    .input(clientAddressSchema)
    .mutation(async ({ ctx, input }) => {
      const businessId = ctx.session.user.businessId;
      await updateClientAddressCommand.update(input, businessId);
    }),
});
