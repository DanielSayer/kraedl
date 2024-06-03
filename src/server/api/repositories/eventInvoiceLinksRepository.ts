import { db } from '@/server/db'
import { eventPricings } from '@/server/db/schema'
import { inArray } from 'drizzle-orm'

class EventInvoiceLinksRepository {
  async getEventsInvoiceId(eventIds: string[]) {
    return await db.query.invoiceEventLink.findMany({
      where: inArray(eventPricings.eventId, eventIds),
    })
  }
}

const eventInvoiceLinksRepository = new EventInvoiceLinksRepository()
export default eventInvoiceLinksRepository
