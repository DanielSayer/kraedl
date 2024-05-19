import { db } from "@/server/db";
import { invoiceEventLink, invoices } from "@/server/db/schema";
import { single } from "../common/helperMethods/arrayHelpers";
import { eq, count } from "drizzle-orm";

type NewInvoice = typeof invoices.$inferInsert;

class InvoicesRepository {
  async create(invoice: NewInvoice, eventIds: string[]) {
    const result = await db
      .insert(invoices)
      .values(invoice)
      .returning({ id: invoices.id });
    const invoiceId = single(result).id;

    const links = eventIds.map((x) => ({ eventId: x, invoiceId: invoiceId }));
    await db.insert(invoiceEventLink).values(links);
    return invoiceId;
  }
  async getNextInvoiceNumber(businessId: string) {
    const amount = await db
      .select({ count: count() })
      .from(invoices)
      .where(eq(invoices.businessId, businessId));
    return single(amount).count + 1;
  }
}

export const invoicesRepository = new InvoicesRepository();
