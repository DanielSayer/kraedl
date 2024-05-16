import { eventIdSchema } from "@/lib/validations/events";
import { fromResult } from "../../common/fromResult";
import { getEventPricingsByEventIdQuery } from "../../managers/eventPricing/getByEventIdQuery";
import { saveEventPricingsCommand } from "../../managers/eventPricing/saveEventPricingsCommand";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { saveEventPricingsSchema } from "@/lib/validations/eventPricing";

export const eventPricingRouter = createTRPCRouter({
  getById: adminProcedure.input(eventIdSchema).query(async ({ input }) => {
    return await getEventPricingsByEventIdQuery(input.id);
  }),
  save: adminProcedure
    .input(saveEventPricingsSchema)
    .mutation(async ({ input }) => {
      const result = await saveEventPricingsCommand(input);
      return fromResult(result);
    }),
});
