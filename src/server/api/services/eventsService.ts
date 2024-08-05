import type { RecurrenceFrequency } from '@/types/recurrence'
import { format } from 'date-fns'
import { addTime, Recurrence } from '../common/valueObjects/Recurrence'
import type { EventWithLineItemTotals } from '../repositories/actions/eventsActions'
import eventExceptionsRepository from '../repositories/events/eventExceptions/eventExceptionsRepository'
import eventsRepository from '../repositories/events/eventSeries/eventsRepository'

type Range = {
  start: Date
  end: Date
}

export const eventsService = {
  getEventsInRange: async (start: Date, end: Date, businessId: string) => {
    const events = await eventsRepository.getEventsInDateRange(
      start.toISOString(),
      end.toISOString(),
      businessId,
    )

    const eventRecurrences = events.map((e) => ({
      event: e,
      recurrence: Recurrence.TryCreate(
        e.rrule,
        format(e.startTime, 'yyyy-MM-dd'),
      ).Value,
    }))

    const eventProjections = eventRecurrences.flatMap(({ event, recurrence }) =>
      getProjections(recurrence, event, { start, end }),
    )

    const eventExceptions =
      await eventExceptionsRepository.getEventsInDateRange(
        start.toISOString(),
        end.toISOString(),
        businessId,
      )

    return removeProjectionsWithExceptions(eventProjections, eventExceptions)
  },
}

function getProjections(
  recurrence: Recurrence,
  event: EventWithLineItemTotals,
  range: Range,
) {
  if (recurrence.Frequency === 'NONE') {
    if (isEventInRange({ start: event.startTime, end: event.endTime }, range)) {
      return [event]
    }
    return []
  }

  return getNextEvents(
    event,
    range,
    recurrence.Frequency,
    recurrence.Interval!,
    recurrence.Count,
    recurrence.Until,
  )
}

function isEventInRange(eventRange: Range, queryRange: Range) {
  return (
    eventRange.start.getTime() >= queryRange.start.getTime() &&
    eventRange.end.getTime() <= queryRange.end.getTime()
  )
}

function getNextEvents(
  event: EventWithLineItemTotals,
  queryRange: Range,
  frequency: RecurrenceFrequency,
  interval: number,
  count: number | undefined,
  until: string | undefined,
): EventWithLineItemTotals[] {
  const events = []
  if (count) {
    for (let i = 0; i < count; i++) {
      const projectedStart = addTime(frequency, event.startTime, i * interval)
      const projectedEnd = addTime(frequency, event.endTime, i * interval)
      if (
        isEventInRange({ start: projectedStart, end: projectedEnd }, queryRange)
      ) {
        events.push({
          ...event,
          startTime: projectedStart,
          endTime: projectedEnd,
        })
      }
    }
    return events
  }

  if (until) {
    let lastEvent = event
    while (
      lastEvent.endTime.getTime() <= new Date(until).getTime() &&
      !isEventInRange(
        { start: lastEvent.startTime, end: lastEvent.endTime },
        queryRange,
      )
    ) {
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

function removeProjectionsWithExceptions(
  projections: EventWithLineItemTotals[],
  exceptions: EventWithLineItemTotals[],
): EventWithLineItemTotals[] {
  const projectionsWithoutExceptions = projections.filter((projection) => {
    return !exceptions.some(
      (exception) =>
        exception.eventId === projection.id &&
        exception.startTime.getTime() === projection.startTime.getTime(),
    )
  })

  return [...projectionsWithoutExceptions, ...exceptions]
}
