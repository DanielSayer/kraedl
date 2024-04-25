import createBusinessCommand from "../../managers/business/createBusinessCommand";
import { getBusinessNameQuery } from "../../managers/business/getBusinessNameQuery";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { businessRegisterSchema, getByIdSchema } from "./businessSchemas";

export const businessRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(getByIdSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const result = await getBusinessNameQuery.get(userId, input.businessId);
      return result;
    }),
  register: publicProcedure
    .input(businessRegisterSchema)
    .mutation(async ({ input }) => {
      const result = await createBusinessCommand.create(input);
      return result;
    }),
});
