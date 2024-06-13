import type { Recurrence } from '../valueObjects/Recurrence'

type Event = {
  id: string
  name: string
  startTime: Date
  endTime: Date
  clientId: string
  invoicedAt: string | null
}

export const getProjectedEvent = (
  event: Event,
  eventRecurrence: Recurrence,
  startTime: string,
) => {
  const targetTime = new Date(startTime).getTime()
  let currentEvent = event
  do {
    if (currentEvent.startTime.getTime() === targetTime) {
      return currentEvent
    }
    const nextEventDate = eventRecurrence.getNextEventDates(
      currentEvent.startTime,
      currentEvent.endTime,
    )
    const updatedEvent = {
      ...currentEvent,
      startTime: nextEventDate.start,
      endTime: nextEventDate.end,
    }
    currentEvent = updatedEvent
  } while (eventRecurrence.hasNextEvent(currentEvent.endTime))
  return null
}
