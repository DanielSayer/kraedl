import { format } from 'date-fns'
import { getProjectedEvent } from '../../common/helperMethods/eventHelpers'
import { Recurrence } from '../../common/valueObjects/Recurrence'
import eventsRepository from '../../repositories/events/eventSeries/eventsRepository'

export async function getEventById(
  eventId: string,
  startDate: string,
  businessId: string,
) {
  const event = await eventsRepository.getById(eventId, businessId)
  const recurrenceResult = Recurrence.TryCreate(
    event.rrule,
    format(event.startTime, 'yyyy-MM-dd'),
  )

  if (recurrenceResult.IsFailure) {
    throw new Error(`Event ${event.id} could not generate recurrence`)
  }

  const recurrence = recurrenceResult.Value

  const projectedEvent = getProjectedEvent(event, recurrence, startDate)
  if (!projectedEvent) {
    throw new Error(`Event ${event.id} could not calculate projection`)
  }

  return {
    ...projectedEvent,
    date: format(projectedEvent.startTime, 'yyyy-MM-dd'),
    startTime: format(projectedEvent.startTime, 'HH:mm'),
    endTime: format(projectedEvent.endTime, 'HH:mm'),
    recurrence: {
      frequency: recurrence.Frequency,
      interval: recurrence.Interval ? `${recurrence.Interval}` : undefined,
      endType: recurrence.EndType,
      count: recurrence.Count ? `${recurrence.Count}` : undefined,
      until: recurrence.Until
        ? format(new Date(recurrence.Until), 'yyyy-MM-dd')
        : undefined,
    },
  }
}
