import { getBusinsessGrossIncome } from "../../managers/dashboard/getBusinessGrossIncome";
import { getNumberOfClientsForBusinessQuery } from "../../managers/dashboard/getNumberOfClientsForBusiness";
import { getUpcomingEventsCommand } from "../../managers/dashboard/getUpcomingEventsCommand";
import { adminProcedure, createTRPCRouter } from "../../trpc";

export const dashboardRouter = createTRPCRouter({
  getUpcomingEvents: adminProcedure.query(async ({ ctx }) => {
    return await getUpcomingEventsCommand(ctx.businessId);
  }),
  getNumberOfClientsForBusiness: adminProcedure.query(async ({ ctx }) => {
    return await getNumberOfClientsForBusinessQuery(ctx.businessId);
  }),
  getMonthlyIncome: adminProcedure.query(async ({ ctx }) => {
    return await getBusinsessGrossIncome(ctx.businessId);
  }),
});
