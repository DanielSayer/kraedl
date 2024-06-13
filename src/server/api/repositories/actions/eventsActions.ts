import { DEFAULT_RRULE } from '@/types/recurrence'

type EventRawData = {
  id: string
  eventId: string
  name: string
  clientName: string
  startTime: Date
  endTime: Date
  rrule?: string
  lineItemTotal: string | null
}

export type EventWithLineItemTotals = {
  id: string
  eventId: string
  name: string
  clientName: string
  startTime: Date
  endTime: Date
  rrule: string
  lineItemsTotal: string[]
}

export const mapEvents = (data: EventRawData[]) => {
  const eventMap = new Map<string, EventWithLineItemTotals>()

  data.forEach((item) => {
    if (!eventMap.has(item.id)) {
      eventMap.set(item.id, {
        id: item.id,
        eventId: item.eventId,
        name: item.name,
        clientName: item.clientName,
        startTime: item.startTime,
        endTime: item.endTime,
        rrule: item.rrule ?? DEFAULT_RRULE,
        lineItemsTotal: [] as string[],
      })
    }
    if (item.lineItemTotal !== null) {
      const event = eventMap.get(item.id)
      if (!event) return
      event.lineItemsTotal.push(item.lineItemTotal)
    }
  })

  return Array.from(eventMap.values())
}
