import type { getEventsInRangeSchema } from '@/lib/validations/events'
import type { EventStatus } from '@/types/events'
import type { RecurrenceFrequency } from '@/types/recurrence'
import { format } from 'date-fns'
import type { z } from 'zod'
import { Recurrence, addTime } from '../../common/valueObjects/Recurrence'
import type { EventWithLineItemTotals } from '../../repositories/actions/eventsActions'
import eventsRepository from '../../repositories/eventsRepository'

type GetEventsInRangeRequest = z.infer<typeof getEventsInRangeSchema>

export async function getEventsInRange(
  range: GetEventsInRangeRequest,
  businessId: string,
) {
  const start = new Date(range.startTime)
  const end = new Date(range.endTime)

  const events = await eventsRepository.getEventsInDateRange(
    start.toISOString(),
    end.toISOString(),
    businessId,
  )

  const eventRecurrences = events.map((e) => ({
    event: e,
    recurrence: Recurrence.TryCreate(e.rrule, format(e.startTime, 'yyyy-MM-dd'))
      .Value,
  }))

  const eventProjections = eventRecurrences.flatMap(({ event, recurrence }) =>
    getProjections(recurrence, event, range),
  )

  return eventProjections.map((event) => ({
    id: event.id,
    name: event.name,
    clientName: event.clientName,
    startTime: event.startTime,
    endTime: event.endTime,
    status: getEventStatus(event.lineItemsTotal),
  }))
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

function getProjections(
  recurrence: Recurrence,
  event: EventWithLineItemTotals,
  range: GetEventsInRangeRequest,
) {
  if (recurrence.Frequency === 'NONE') {
    if (
      isEventInRange(
        event.startTime,
        event.endTime,
        range.startTime,
        range.endTime,
      )
    ) {
      return [event]
    }
    return []
  }

  return getNextEvents(
    event,
    recurrence.Frequency,
    recurrence.Interval!,
    recurrence.Count,
    recurrence.Until,
  )
}

function getNextEvents(
  event: EventWithLineItemTotals,
  frequency: RecurrenceFrequency,
  interval: number,
  count: number | undefined,
  until: string | undefined,
): EventWithLineItemTotals[] {
  if (count) {
    return Array.from({ length: count }, (_, i) => i).map((i) => ({
      ...event,
      startTime: addTime(frequency, event.startTime, i * interval),
      endTime: addTime(frequency, event.endTime, i * interval),
    }))
  }

  if (until) {
    const events = []
    let lastEvent = event
    while (lastEvent.endTime.getTime() <= new Date(until).getTime()) {
      events.push(lastEvent)
      const newEvent = {
        ...lastEvent,
        startTime: addTime(frequency, event.startTime, interval),
        endTime: addTime(frequency, event.endTime, interval),
      }

      lastEvent = newEvent
    }

    return events
  }

  return []
}

function isEventInRange(
  eventStart: Date,
  eventEnd: Date,
  queryStart: string,
  queryEnd: string,
) {
  return (
    eventStart.getTime() >= new Date(queryStart).getTime() &&
    eventEnd.getTime() <= new Date(queryEnd).getTime()
  )
}
