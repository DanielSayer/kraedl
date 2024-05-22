import type { InvoiceStatus } from "@/types/invoices";
import { invoicesRepository } from "../../repositories/invoicesRepository";

export async function getInvoicesQuery(
  pageNumber: number,
  pageSize: number,
  businessId: string,
) {
  const invoices = await invoicesRepository.getInvoices(
    businessId,
    pageSize,
    pageNumber,
  );

  const numberOfInvoices =
    await invoicesRepository.getNumberOfInvoices(businessId);

  return {
    count: numberOfInvoices,
    invoices: invoices.map((i) => ({
      id: i.id,
      invoiceNumber: i.invoiceNumber,
      clientName: i.clientName,
      status: getInvoiceStatus(i.invoicedAt, i.dueDate, i.paidAt),
      total: i.total,
    })),
  };
}

function getInvoiceStatus(
  invoicedAt: Date | null,
  dueDate: string,
  paidAt: Date | null,
): InvoiceStatus {
  if (!invoicedAt) {
    return "DRAFT";
  }

  if (paidAt) {
    return "PAID";
  }

  const now = new Date().getTime();
  const due = new Date(dueDate).getTime();
  if (due < now) {
    return "OVERDUE";
  }

  return "INVOICED";
}
