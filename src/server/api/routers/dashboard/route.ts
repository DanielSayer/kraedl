import { getBusinsessGrossIncome } from "../../managers/dashboard/getBusinessGrossIncome";
import { getNumberOfClientsForBusinessQuery } from "../../managers/dashboard/getNumberOfClientsForBusiness";
import {
  getNumberOfEventsLeftInWeekQuery,
  getUpcomingEventsQuery,
} from "../../managers/dashboard/getEventsQueries";
import { adminProcedure, createTRPCRouter } from "../../trpc";

export const dashboardRouter = createTRPCRouter({
  getUpcomingEvents: adminProcedure.query(async ({ ctx }) => {
    return await getUpcomingEventsQuery(ctx.businessId);
  }),
  getNumberOfClientsForBusiness: adminProcedure.query(async ({ ctx }) => {
    return await getNumberOfClientsForBusinessQuery(ctx.businessId);
  }),
  getMonthlyIncome: adminProcedure.query(async ({ ctx }) => {
    return await getBusinsessGrossIncome(ctx.businessId);
  }),
  getNumberOfEventsLeftInWeek: adminProcedure.query(async ({ ctx }) => {
    return await getNumberOfEventsLeftInWeekQuery(ctx.businessId);
  }),
});
