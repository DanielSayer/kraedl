import { db } from '@/server/db'
import { eventExceptions, events } from '@/server/db/schema'
import { single } from '../common/helperMethods/arrayHelpers'

type EventExceptionDto = {
  eventId: string
  eventStartTime: Date
  name?: string
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
      .returning({ id: events.id })

    return single(id)
  }
}

const eventExceptionsRepository = new EventExceptionsRepository()
export default eventExceptionsRepository
