import type { UpdateInvoiceRequest } from '@/lib/validations/invoices'
import { TRPCClientError } from '@trpc/client'
import DateRange from '../../common/valueObjects/DateRange'
import { invoicesRepository } from '../../repositories/invoicesRepository'

export async function invoiceCommand(
  request: UpdateInvoiceRequest,
  businessId: string,
) {
  const dateRangeResult = DateRange.NewResult(
    new Date(request.issueDate),
    new Date(request.dueDate),
  )

  if (dateRangeResult.IsFailure) {
    throw new TRPCClientError('Due date must be after issue date')
  }

  const isInvoiced = await invoicesRepository.isInvoiced(
    request.invoiceId,
    businessId,
  )

  if (isInvoiced) {
    throw new TRPCClientError(
      'Invoice has already been invoiced. Cannot make changes',
    )
  }

  await invoicesRepository.update(request, businessId)
  await invoicesRepository.invoice(request.invoiceId, businessId)
}
