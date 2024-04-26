import createBusinessCommand from "../../managers/business/createBusinessCommand";
import { getBusinessNameQuery } from "../../managers/business/getBusinessNameQuery";
import { getNumberOfStaffInBusinessQuery } from "../../managers/business/getNumberOfStaffInBusinessQuery";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { businessRegisterSchema, idSchema } from "./businessSchemas";

export const businessRouter = createTRPCRouter({
  getById: publicProcedure.input(idSchema).query(async ({ input }) => {
    const result = await getBusinessNameQuery.get(input.businessId);
    return result;
  }),
  getNumberOfStaff: publicProcedure.input(idSchema).query(async ({ input }) => {
    const result = await getNumberOfStaffInBusinessQuery.count(
      input.businessId,
    );
    return result;
  }),
  register: publicProcedure
    .input(businessRegisterSchema)
    .mutation(async ({ input }) => {
      const result = await createBusinessCommand.create(input);
      return result;
    }),
});
