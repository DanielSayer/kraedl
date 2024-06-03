import { getInvoiceStatus } from '../../common/helperMethods/invoiceHelpers'
import { invoicesRepository } from '../../repositories/invoicesRepository'

export async function getInvoicesQuery(
  pageNumber: number,
  pageSize: number,
  businessId: string,
) {
  const invoices = await invoicesRepository.getInvoices(
    businessId,
    pageSize,
    pageNumber,
  )

  const numberOfInvoices =
    await invoicesRepository.getNumberOfInvoices(businessId)

  return {
    count: numberOfInvoices,
    invoices: invoices.map((i) => ({
      id: i.id,
      invoiceNumber: i.invoiceNumber,
      clientName: i.clientName,
      clientEmail: i.clientEmail,
      issueDate: i.issueDate,
      dueDate: i.dueDate,
      status: getInvoiceStatus(i.invoicedAt, i.dueDate, i.paidAt),
      total: i.total,
    })),
  }
}
