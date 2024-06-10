import type { Recurrence } from '../valueObjects/Recurrence'

type Event = {
  id: string
  name: string | null
  startTime: Date
  endTime: Date
  clientName: string
  invoicedAt: string | null
}

export const getProjectedEvent = (
  event: Event,
  eventRecurrence: Recurrence,
  startTime: string,
) => {
  const targetTime = new Date(startTime).getTime()
  let currentEvent = event
  while (eventRecurrence.hasNextEvent(currentEvent.endTime)) {
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
  }
  return null
}
