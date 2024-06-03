import { db } from '@/server/db'
import { eventPricings } from '@/server/db/schema'
import { eq, inArray } from 'drizzle-orm'

type EventPricingDto = {
  id: string
  pricingId: string
  quantity: string
  totalPrice: string
}

class EventPricingRepository {
  async getByEventId(eventId: string) {
    return await db.query.eventPricings.findMany({
      where: eq(eventPricings.eventId, eventId),
      columns: {
        id: true,
        pricingId: true,
        quantity: true,
        totalPrice: true,
      },
    })
  }
  async insertEventPricings(req: EventPricingDto[], eventId: string) {
    await db.delete(eventPricings).where(eq(eventPricings.eventId, eventId))
    await db
      .insert(eventPricings)
      .values(req.map((x) => ({ ...x, eventId: eventId })))
  }
  async getEventPricingsByEventIds(eventIds: string[]) {
    return await db.query.eventPricings.findMany({
      columns: {
        eventId: true,
        quantity: true,
      },
      where: inArray(eventPricings.eventId, eventIds),
      with: {
        pricing: {
          columns: {
            price: true,
          },
        },
      },
    })
  }
}

const eventPricingRepository = new EventPricingRepository()
export default eventPricingRepository
