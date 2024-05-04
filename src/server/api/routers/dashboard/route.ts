import { getNumberOfClientsForBusinessQuery } from "../../managers/dashboard/getNumberOfClientsForBusiness";
import { getUpcomingEventsCommand } from "../../managers/dashboard/getUpcomingEventsCommand";
import { adminProcedure, createTRPCRouter } from "../../trpc";

export const dashboardRouter = createTRPCRouter({
  getUpcomingEvents: adminProcedure.query(async ({ ctx }) => {
    const businessId = ctx.session.user.businessId;
    return await getUpcomingEventsCommand(businessId);
  }),
  getNumberOfClientsForBusiness: adminProcedure.query(async ({ ctx }) => {
    const businessId = ctx.session.user.businessId;
    return await getNumberOfClientsForBusinessQuery(businessId);
  }),
});
