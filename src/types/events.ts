import type { Recurrence } from './recurrence'

export type Event = {
  id: string
  name: string
  clientName: string
  startTime: Date
  endTime: Date
  status: EventStatus
}

export type EventStatus = 'DRAFT' | 'READY'

export type QuoteEvent = {
  id: string
  clientId: string
  name: string
  startTime: string
  endTime: string
  date: string
  invoicedAt: string | null
  recurrence: Recurrence
}
