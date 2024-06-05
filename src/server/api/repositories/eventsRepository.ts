import { db } from '@/server/db'
import {
  clients,
  eventPricings,
  events,
  invoiceEventLink,
  invoices,
} from '@/server/db/schema'
import { and, count, desc, eq, gte, lte, sql } from 'drizzle-orm'
import { single } from '../common/helperMethods/arrayHelpers'
import { mapEvents } from './actions/eventsActions'

type EventDto = {
  name?: string
  clientId: string
  startTime: Date
  endTime: Date
  businessId: string
}

class EventsRepository {
  async create(event: EventDto) {
    const id = await db
      .insert(events)
      .values({
        name: event.name,
        clientId: event.clientId,
        startTime: event.startTime,
        endTime: event.endTime,
        businessId: event.businessId,
      })
      .returning({ id: events.id })

    return single(id)
  }
  async getEventsInDateRange(start: string, end: string, businessId: string) {
    const rawEventInRangeData = await db
      .select({
        id: events.id,
        name: events.name,
        clientName: clients.name,
        startTime: events.startTime,
        endTime: events.endTime,
        rrule: events.rrule,
        lineItemTotal: eventPricings.totalPrice,
      })
      .from(events)
      .innerJoin(clients, eq(clients.id, events.clientId))
      .leftJoin(eventPricings, eq(eventPricings.eventId, events.id))
      .where(eq(events.businessId, businessId))
    return mapEvents(rawEventInRangeData)
  }
  async getById(eventId: string, businessId: string) {
    const event = await db
      .select({
        id: events.id,
        name: events.name,
        startTime: events.startTime,
        endTime: events.endTime,
        clientName: clients.name,
        rrule: events.rrule,
        invoicedAt: invoices.issueDate,
      })
      .from(events)
      .innerJoin(clients, eq(clients.id, events.clientId))
      .leftJoin(invoiceEventLink, eq(invoiceEventLink.eventId, events.id))
      .leftJoin(invoices, eq(invoices.id, invoiceEventLink.invoiceId))
      .where(and(eq(events.id, eventId), eq(events.businessId, businessId)))

    return single(event)
  }
  async countNonInvoicedEventsInThePast(currentTime: Date, businessId: string) {
    const amount = await db
      .select({ count: count() })
      .from(events)
      .innerJoin(clients, eq(events.clientId, clients.id))
      .leftJoin(invoiceEventLink, eq(events.id, invoiceEventLink.eventId))
      .where(
        and(
          lte(events.endTime, currentTime),
          eq(events.businessId, businessId),
          sql`${invoiceEventLink.invoiceId} IS NULL`,
        ),
      )

    return single(amount).count
  }
  async getPastEvents(
    currentTime: Date,
    businessId: string,
    pageSize: number,
    pageNumber: number,
  ) {
    const offset = pageSize * pageNumber

    return await db
      .select({
        id: events.id,
        name: events.name,
        clientName: clients.name,
        clientId: clients.id,
        startTime: events.startTime,
        endTime: events.endTime,
      })
      .from(events)
      .innerJoin(clients, eq(events.clientId, clients.id))
      .leftJoin(invoiceEventLink, eq(events.id, invoiceEventLink.eventId))
      .where(
        and(
          eq(events.businessId, businessId),
          lte(events.endTime, currentTime),
          sql`${invoiceEventLink.invoiceId} IS NULL`,
        ),
      )
      .offset(offset)
      .limit(pageSize)
      .orderBy(desc(events.endTime))
  }
  async updateEventRecurrence(rrule: string, until: Date, eventId: string) {
    await db.update(events).set({ rrule, until }).where(eq(events.id, eventId))
  }
}

const eventsRepository = new EventsRepository()
export default eventsRepository
