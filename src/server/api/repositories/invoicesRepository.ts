import { db } from "@/server/db";
import {
  eventPricings,
  invoiceEventLink,
  invoices,
  pricing,
} from "@/server/db/schema";
import { single } from "../common/helperMethods/arrayHelpers";
import { eq, count, and } from "drizzle-orm";
import { mapInvoiceToLineItems } from "./actions/invoicesActions";

type NewInvoice = typeof invoices.$inferInsert;
type UpdateInvoiceRequest = {
  invoiceId: string;
  dueDate: string;
  issueDate: string;
};

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
  async getInvoiceById(invoiceId: string, businessId: string) {
    const res = await db
      .select({
        id: invoices.id,
        clientId: invoices.clientId,
        invoiceNumber: invoices.invoiceNumber,
        total: invoices.invoiceAmount,
        issueDate: invoices.issueDate,
        dueDate: invoices.dueDate,
        pricingId: pricing.id,
        pricingLine: pricing.label,
        quantity: eventPricings.quantity,
        pricePer: pricing.price,
      })
      .from(invoices)
      .innerJoin(invoiceEventLink, eq(invoiceEventLink.invoiceId, invoices.id))
      .innerJoin(
        eventPricings,
        eq(invoiceEventLink.eventId, eventPricings.eventId),
      )
      .innerJoin(pricing, eq(pricing.id, eventPricings.pricingId))
      .where(
        and(eq(invoices.id, invoiceId), eq(invoices.businessId, businessId)),
      );

    return mapInvoiceToLineItems(res);
  }
  async invoice(invoiceId: string, businessId: string) {
    await db
      .update(invoices)
      .set({ invoicedAt: new Date() })
      .where(
        and(eq(invoices.id, invoiceId), eq(invoices.businessId, businessId)),
      );
  }
  async update(req: UpdateInvoiceRequest, businessId: string) {
    await db
      .update(invoices)
      .set({
        issueDate: req.issueDate,
        dueDate: req.dueDate,
      })
      .where(
        and(
          eq(invoices.id, req.invoiceId),
          eq(invoices.businessId, businessId),
        ),
      );
  }
  async isInvoiced(invoiceId: string, businessId: string) {
    const invoicedAt = await db
      .select({ invoicedAt: invoices.invoicedAt })
      .from(invoices)
      .where(
        and(eq(invoices.id, invoiceId), eq(invoices.businessId, businessId)),
      );

    return single(invoicedAt).invoicedAt !== null;
  }
}

export const invoicesRepository = new InvoicesRepository();
