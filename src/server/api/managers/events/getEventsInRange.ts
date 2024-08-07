import type { getEventsInRangeSchema } from '@/lib/validations/events'
import type { EventStatus } from '@/types/events'
import type { z } from 'zod'
import { eventsService } from '../../services/eventsService'

type GetEventsInRangeRequest = z.infer<typeof getEventsInRangeSchema>

export async function getEventsInRange(
  range: GetEventsInRangeRequest,
  businessId: string,
) {
  const start = new Date(range.startTime)
  const end = new Date(range.endTime)

  const events = await eventsService.getEventsInRange(start, end, businessId)

  return events.map((event) => {
    const isException = event.id !== event.eventId
    return {
      id: event.eventId,
      isException: isException,
      exceptionId: isException ? event.id : undefined,
      name: event.name,
      clientName: event.clientName,
      startTime: event.startTime,
      endTime: event.endTime,
      status: getEventStatus(event.lineItemsTotal),
    }
  })
}

const getEventStatus = (lineItemsTotal: string[]): EventStatus => {
  const eventTotalPrice = lineItemsTotal.reduce(
    (c, curr) => c + parseFloat(curr),
    0,
  )
  if (eventTotalPrice === 0) {
    return 'DRAFT'
  }

  return 'READY'
}
