import { db } from '@/server/db'
import { eventExceptionPricings } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

type EventPricingDto = {
  id: string
  pricingId: string
  quantity: string
  totalPrice: string
}

class EventExceptionsPricingRepository {
  async insertEventExceptionPricings(
    pricings: EventPricingDto[],
    eventExceptionId: string,
  ) {
    await db
      .delete(eventExceptionPricings)
      .where(eq(eventExceptionPricings.eventExceptionId, eventExceptionId))
    await db
      .insert(eventExceptionPricings)
      .values(pricings.map((x) => ({ eventExceptionId, ...x })))
  }
  async getByEventId(exceptionId: string) {
    return await db.query.eventExceptionPricings.findMany({
      where: eq(eventExceptionPricings.eventExceptionId, exceptionId),
      columns: {
        id: true,
        pricingId: true,
        quantity: true,
        totalPrice: true,
      },
    })
  }
}

const eventExceptionsPricingRepository = new EventExceptionsPricingRepository()
export default eventExceptionsPricingRepository
