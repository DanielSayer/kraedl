import type { InvoiceStatus } from '@/types/invoices'

export const getInvoiceStatus = (
  invoicedAt: Date | null,
  dueDate: string | null,
  paidAt: Date | null,
): InvoiceStatus => {
  if (!invoicedAt || !dueDate) {
    return 'DRAFT'
  }

  if (paidAt) {
    return 'PAID'
  }

  const now = new Date().getTime()
  const due = new Date(dueDate).getTime()
  if (due < now) {
    return 'OVERDUE'
  }

  return 'INVOICED'
}
