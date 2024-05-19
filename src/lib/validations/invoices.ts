import { z } from "zod";

export const createInvoiceSchema = z.object({
  eventIds: z.array(z.string()),
  clientId: z.string(),
});

export type CreateInvoiceRequest = z.infer<typeof createInvoiceSchema>;
