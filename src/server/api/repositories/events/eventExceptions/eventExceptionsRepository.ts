import { single } from '@/server/api/common/helperMethods/arrayHelpers'
import { db } from '@/server/db'
import {
  clients,
  eventExceptionPricings,
  eventExceptions,
} from '@/server/db/schema'
import { and, eq, gte, lte } from 'drizzle-orm'
import { mapEvents } from '../../actions/eventsActions'

type EventExceptionDto = {
  eventId: string
  eventStartTime: Date
  name: string
  clientId: string
  startTime: Date
  endTime: Date
  businessId: string
}

class EventExceptionsRepository {
  async create(event: EventExceptionDto) {
    const id = await db
      .insert(eventExceptions)
      .values({
        eventId: event.eventId,
        eventStartTime: event.eventStartTime,
        name: event.name,
        clientId: event.clientId,
        startTime: event.startTime,
        endTime: event.endTime,
        businessId: event.businessId,
      })
      .returning({ id: eventExceptions.id })

    return single(id)
  }
  async getEventsInDateRange(start: string, end: string, businessId: string) {
    const rawEventInRangeData = await db
      .select({
        id: eventExceptions.id,
        eventId: eventExceptions.eventId,
        name: eventExceptions.name,
        clientName: clients.name,
        startTime: eventExceptions.startTime,
        endTime: eventExceptions.endTime,
        lineItemTotal: eventExceptionPricings.totalPrice,
      })
      .from(eventExceptions)
      .innerJoin(clients, eq(clients.id, eventExceptions.clientId))
      .leftJoin(
        eventExceptionPricings,
        eq(eventExceptionPricings.eventExceptionId, eventExceptions.id),
      )
      .where(
        and(
          gte(eventExceptions.eventStartTime, new Date(start)),
          lte(eventExceptions.eventStartTime, new Date(end)),
          eq(eventExceptions.businessId, businessId),
        ),
      )
    return mapEvents(rawEventInRangeData)
  }
}

const eventExceptionsRepository = new EventExceptionsRepository()
export default eventExceptionsRepository
