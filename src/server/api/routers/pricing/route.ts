import { fromResult } from "../../common/fromResult";
import { createPricingCommand } from "../../managers/pricing/createPricingCommand";
import { getPricingByBusinessIdQuery } from "../../managers/pricing/getPricingByBusinessIdQuery";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { createPricingPackageSchema } from "./settingsSchemas";

export const pricingRouter = createTRPCRouter({
  createPricing: adminProcedure
    .input(createPricingPackageSchema)
    .mutation(async ({ input, ctx }) => {
      const businessId = ctx.session.user.businessId;
      const result = await createPricingCommand(input, businessId);
      return fromResult(result);
    }),
  getPricings: adminProcedure.query(async ({ ctx }) => {
    const businessId = ctx.session.user.businessId;
    return await getPricingByBusinessIdQuery(businessId);
  }),
});
