import {
  createInvoiceSchema,
  invoiceIdSchema,
  invoicesRequest,
  updateInvoiceSchema,
} from "@/lib/validations/invoices";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { createInvoiceCommand } from "../../managers/invoices/createInvoiceCommand";
import { getInvoiceByIdQuery } from "../../managers/invoices/getInvoiceByIdQuery";
import { invoiceCommand } from "../../managers/invoices/invoiceCommand";
import { getInvoicesQuery } from "../../managers/invoices/getInvoicesQuery";

export const invoicesRouter = createTRPCRouter({
  create: adminProcedure
    .input(createInvoiceSchema)
    .mutation(async ({ input, ctx }) => {
      return await createInvoiceCommand(input, ctx.businessId);
    }),
  getById: adminProcedure
    .input(invoiceIdSchema)
    .query(async ({ input, ctx }) => {
      return await getInvoiceByIdQuery(input.invoiceId, ctx.businessId);
    }),
  invoice: adminProcedure
    .input(updateInvoiceSchema)
    .mutation(async ({ input, ctx }) => {
      return await invoiceCommand(input, ctx.businessId);
    }),
  getInvoices: adminProcedure
    .input(invoicesRequest)
    .query(async ({ input, ctx }) => {
      return await getInvoicesQuery(
        input.pageIndex,
        input.pageSize,
        ctx.businessId,
      );
    }),
});
