export type Event = {
  id: string
  name: string | null
  clientName: string
  startTime: Date
  endTime: Date
  status: EventStatus
}

export type EventStatus = 'DRAFT' | 'READY'

export type QuoteEvent = {
  id: string
  name: string | null
  startTime: Date
  endTime: Date
  clientName: string
  invoicedAt: string | null
}
