import { format } from 'date-fns'
import { Recurrence } from '../../common/valueObjects/Recurrence'
import eventsRepository from '../../repositories/eventsRepository'

export async function getEventById(eventId: string, businessId: string) {
  const event = await eventsRepository.getById(eventId, businessId)
  const recurrenceResult = Recurrence.TryCreate(
    event.rrule,
    format(event.startTime, 'yyyy-MM-dd'),
  )

  if (recurrenceResult.isFailure()) {
    throw new Error(`Event ${event.id} could not generate recurrence`)
  }

  const recurrence = recurrenceResult.GetValue()

  return {
    ...event,
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
