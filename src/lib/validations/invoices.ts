import { z } from "zod";
import { date } from "./_generics";

export const createInvoiceSchema = z.object({
  eventIds: z.array(z.string()),
  clientId: z.string(),
});

export const invoiceIdSchema = z.object({
  invoiceId: z.string(),
});

export type CreateInvoiceRequest = z.infer<typeof createInvoiceSchema>;

export const updateInvoiceSchema = z.object({
  invoiceId: z.string(),
  issueDate: date,
  dueDate: date,
});

export type UpdateInvoiceRequest = z.infer<typeof updateInvoiceSchema>;
