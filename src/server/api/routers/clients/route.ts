import createClientCommand from "../../managers/clients/createClientCommand";
import { getClientAddressByIdQuery } from "../../managers/clients/getClientAddressByIdQuery";
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
      return await createClientCommand.create(input, ctx.businessId);
    }),
  getById: adminProcedure
    .input(clientIdSchema)
    .query(async ({ ctx, input }) => {
      const client = await getClientByIdQuery.get(input.id, ctx.businessId);
      return client;
    }),
  getByBusiness: adminProcedure.query(async ({ ctx }) => {
    return await getClientsForBusinessQuery.get(ctx.businessId);
  }),
  getClientAddress: adminProcedure
    .input(clientIdSchema)
    .query(async ({ ctx, input }) => {
      return await getClientAddressByIdQuery(input.id, ctx.businessId);
    }),
  updateClientAddress: adminProcedure
    .input(clientAddressSchema)
    .mutation(async ({ ctx, input }) => {
      await updateClientAddressCommand.update(input, ctx.businessId);
    }),
});
