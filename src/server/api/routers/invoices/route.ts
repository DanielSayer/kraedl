import { createInvoiceSchema } from "@/lib/validations/invoices";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { createInvoiceCommand } from "../../managers/invoices/createInvoiceCommand";

export const invoicesRouter = createTRPCRouter({
  create: adminProcedure
    .input(createInvoiceSchema)
    .mutation(async ({ input, ctx }) => {
      return await createInvoiceCommand(input, ctx.businessId);
    }),
});
