import { format } from 'date-fns'
import { Recurrence } from '../../common/valueObjects/Recurrence'
import eventsRepository from '../../repositories/eventsRepository'
import { getProjectedEvent } from '../../common/helperMethods/eventHelpers'

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
