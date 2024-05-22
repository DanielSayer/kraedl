import { db } from "@/server/db";
import { invoices, events } from "@/server/db/schema";
import { eq, and, gte, lte, gt } from "drizzle-orm";

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
}

const dashboardRepository = new DashboardRepository();
export default dashboardRepository;
