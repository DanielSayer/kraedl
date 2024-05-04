import { getUpcomingEventsCommand } from "../../managers/dashboard/getUpcomingEventsCommand";
import { adminProcedure, createTRPCRouter } from "../../trpc";

export const dashboardRouter = createTRPCRouter({
  getUpcomingEvents: adminProcedure.query(async ({ ctx }) => {
    const businessId = ctx.session.user.businessId;
    return await getUpcomingEventsCommand(businessId);
  }),
});
