import { db } from "@/server/db";
import { invoices, events } from "@/server/db/schema";
import { addDays, lastDayOfWeek } from "date-fns";
import { eq, and, gte, lte, gt, count, sql } from "drizzle-orm";
import { single } from "../common/helperMethods/arrayHelpers";

class DashboardRepository {
  async getInvoiceTotalsInRange(start: Date, end: Date, businessId: string) {
    return await db
      .select({
        total: invoices.invoiceAmount,
      })
      .from(invoices)
      .where(
        and(
          eq(invoices.businessId, businessId),
          gte(invoices.paidAt, start),
          lte(invoices.paidAt, end),
        ),
      );
  }
  async getUpcomingAppointments(businessId: string) {
    return await db.query.events.findMany({
      where: and(
        eq(events.businessId, businessId),
        gt(events.startTime, new Date()),
      ),
      limit: 5,
      orderBy: (events, { asc }) => [asc(events.startTime)],
      with: {
        clients: { columns: { name: true } },
      },
    });
  }
  async getNumberOfEventsLeftInWeek(businessId: string) {
    const today = new Date();
    const lastDay = addDays(lastDayOfWeek(today, { weekStartsOn: 1 }), 1);
    const eventCount = await db
      .select({ count: count() })
      .from(events)
      .where(
        and(
          eq(events.businessId, businessId),
          gte(events.startTime, new Date(today)),
          lte(events.endTime, new Date(lastDay)),
        ),
      );
    return single(eventCount).count;
  }
  async getNumberOfUnpaidInvoices(businessId: string) {
    const invoiceCount = await db
      .select({ count: count() })
      .from(invoices)
      .where(
        and(
          sql`${invoices.paidAt} IS NULL`,
          sql`${invoices.invoicedAt} IS NOT NULL`,
          eq(invoices.businessId, businessId),
        ),
      );
    return single(invoiceCount).count;
  }
}

const dashboardRepository = new DashboardRepository();
export default dashboardRepository;
