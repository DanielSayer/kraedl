import type { CreateInvoiceRequest } from '@/lib/validations/invoices'
import eventPricingRepository from '../../repositories/events/eventSeries/eventPricingRepository'
import { invoicesRepository } from '../../repositories/invoicesRepository'
import { format } from 'date-fns'
import eventInvoiceLinksRepository from '../../repositories/eventInvoiceLinksRepository'

export async function createInvoiceCommand(
  request: CreateInvoiceRequest,
  businessId: string,
) {
  const invoiceIds = await eventInvoiceLinksRepository.getEventsInvoiceId(
    request.eventIds,
  )
  if (invoiceIds.length !== 0) {
    throw new Error('Event has already been invoiced')
  }

  const pricings = await eventPricingRepository.getEventPricingsByEventIds(
    request.eventIds,
  )

  const costPerEvent = pricings.map((x) => {
    const price = parseFloat(x.pricing.price)
    const quantity = parseFloat(x.quantity)
    return price * quantity
  })
  const totalInvoicePrice = costPerEvent
    .reduce((c, curr) => c + curr, 0)
    .toFixed(2)

  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 1)

  const invoiceNumber =
    await invoicesRepository.getNextInvoiceNumber(businessId)

  return await invoicesRepository.create(
    {
      clientId: request.clientId,
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      invoiceAmount: totalInvoicePrice,
      invoiceNumber,
      businessId,
    },
    request.eventIds,
  )
}
