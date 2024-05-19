import { db } from "@/server/db";
import { clients, events, invoiceEventLink } from "@/server/db/schema";
import { and, count, desc, eq, gt, lte, sql } from "drizzle-orm";
import { single } from "../common/helperMethods/arrayHelpers";

type EventDto = {
  name?: string;
  clientId: string;
  startTime: Date;
  endTime: Date;
  businessId: string;
};

type Event = {
  id: string;
  name?: string;
  clientId: string;
  startTime: Date;
  endTime: Date;
};

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
      .returning({ id: events.id });

    return single(id);
  }
  async getEventsInDateRange(start: string, end: string, businessId: string) {
    return (await db.execute(sql`
      SELECT 
        ${events.id},
        ${events.name},
        ${events.clientId},
        ${events.startTime},
        ${events.endTime}
      FROM ${events}
      WHERE ${events.businessId} = ${businessId}
      AND (${events.startTime} >= ${start} AND ${events.startTime} < ${end})
      OR (${events.endTime} >= ${start} AND ${events.endTime} < ${end})
      OR (${events.startTime} < ${start} AND ${events.endTime} >= ${end})
      OR (${events.startTime} >= ${start} AND ${events.endTime} <= ${end})
    `)) as Event[];
  }
  async getUpcomingAppointments(businessId: string) {
    return await db.query.events.findMany({
      where: and(
        eq(events.businessId, businessId),
        gt(events.startTime, new Date()),
      ),
      limit: 5,
      orderBy: (events, { asc }) => [asc(events.startTime)],
      with: {
        clients: { columns: { name: true } },
      },
    });
  }
  async getById(eventId: string, businessId: string) {
    const event = await db.query.events.findFirst({
      where: and(eq(events.id, eventId), eq(events.businessId, businessId)),
      with: {
        clients: {
          columns: {
            name: true,
          },
        },
      },
    });

    return event;
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
      );

    return single(amount).count;
  }
  async getPastEvents(
    currentTime: Date,
    businessId: string,
    pageSize: number,
    pageNumber: number,
  ) {
    const offset = pageSize * pageNumber;

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
      .orderBy(desc(events.endTime));
  }
}

const eventsRepository = new EventsRepository();
export default eventsRepository;
