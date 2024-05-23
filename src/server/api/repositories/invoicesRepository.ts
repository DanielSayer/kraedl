import { db } from "@/server/db";
import {
  clients,
  eventPricings,
  invoiceEventLink,
  invoices,
  pricing,
} from "@/server/db/schema";
import { and, count, desc, eq } from "drizzle-orm";
import { single } from "../common/helperMethods/arrayHelpers";
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
        invoicedAt: invoices.invoicedAt,
        dueDate: invoices.dueDate,
        paidAt: invoices.paidAt,
        pricingId: pricing.id,
        pricingLine: pricing.label,
        quantity: eventPricings.quantity,
        pricePer: pricing.price,
      })
      .from(invoices)
      .leftJoin(invoiceEventLink, eq(invoiceEventLink.invoiceId, invoices.id))
      .leftJoin(
        eventPricings,
        eq(invoiceEventLink.eventId, eventPricings.eventId),
      )
      .leftJoin(pricing, eq(pricing.id, eventPricings.pricingId))
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
  async getInvoices(businessId: string, pageSize: number, pageNumber: number) {
    const offset = pageSize * pageNumber;
    return await db
      .select({
        id: invoices.id,
        invoiceNumber: invoices.invoiceNumber,
        clientName: clients.name,
        clientEmail: clients.email,
        total: invoices.invoiceAmount,
        issueDate: invoices.issueDate,
        dueDate: invoices.dueDate,
        invoicedAt: invoices.invoicedAt,
        paidAt: invoices.paidAt,
      })
      .from(invoices)
      .innerJoin(clients, eq(clients.id, invoices.clientId))
      .where(eq(invoices.businessId, businessId))
      .offset(offset)
      .limit(pageNumber)
      .orderBy(desc(invoices.createdAt));
  }
  async getNumberOfInvoices(businessId: string) {
    const amount = await db
      .select({ count: count() })
      .from(invoices)
      .where(eq(invoices.businessId, businessId));
    return single(amount).count;
  }
  async markAsPaid(invoiceId: string, businessId: string) {
    await db
      .update(invoices)
      .set({ paidAt: new Date() })
      .where(
        and(eq(invoices.businessId, businessId), eq(invoices.id, invoiceId)),
      );
  }
}

export const invoicesRepository = new InvoicesRepository();
