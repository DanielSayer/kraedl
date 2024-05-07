import { fromResult } from "../../common/fromResult";
import { createPricingCommand } from "../../managers/settings/createPricingCommand";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { createPricingPackageSchema } from "./settingsSchemas";

export const settingsRouter = createTRPCRouter({
  createPricing: adminProcedure
    .input(createPricingPackageSchema)
    .mutation(async ({ input, ctx }) => {
      const businessId = ctx.session.user.businessId;
      const result = await createPricingCommand(input, businessId);
      return fromResult(result);
    }),
});
