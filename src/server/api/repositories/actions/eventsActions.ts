type EventRawData = {
  id: string
  name: string | null
  clientName: string
  startTime: Date
  endTime: Date
  rrule: string
  lineItemTotal: string | null
}

export type EventWithLineItemTotals = {
  id: string
  name: string | null
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
        name: item.name,
        clientName: item.clientName,
        startTime: item.startTime,
        endTime: item.endTime,
        rrule: item.rrule,
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
