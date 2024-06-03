import { invoicesRepository } from '../../repositories/invoicesRepository'

export const markInvoiceAsPaidCommand = async (
  invoicedId: string,
  businessId: string,
) => {
  const invoice = await invoicesRepository.getInvoiceById(
    invoicedId,
    businessId,
  )

  if (!invoice) {
    throw new Error(`Invoice not found. Id: ${invoicedId}`)
  }

  if (!!invoice.paidAt || !invoice.invoicedAt || !invoice.issueDate) {
    throw new Error(`Could not mark as paid. Invoice id: ${invoice.id}`)
  }

  await invoicesRepository.markAsPaid(invoicedId, businessId)
}
