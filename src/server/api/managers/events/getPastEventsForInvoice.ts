import { TRPCClientError } from '@trpc/client'
import eventsRepository from '../../repositories/eventsRepository'

export async function getPastEventsForInvoice(
  currentTime: Date,
  businessId: string,
  pageSize: number,
  pageNumber: number,
) {
  if (pageNumber < 0) {
    throw new TRPCClientError('Invalid page number')
  }
  const count = await eventsRepository.countNonInvoicedEventsInThePast(
    currentTime,
    businessId,
  )

  const events = await eventsRepository.getPastEvents(
    currentTime,
    businessId,
    pageSize,
    pageNumber,
  )

  //Drizzle returns "" instead of null but still types it as null
  return {
    events: events.map((x) => ({ ...x, name: x.name ?? '' })),
    count: count,
  }
}
