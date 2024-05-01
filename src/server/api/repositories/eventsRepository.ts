import { db } from "@/server/db";
import { events } from "@/server/db/schema";
import { single } from "../common/helperMethods/arrayHelpers";
import { sql } from "drizzle-orm";

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
  async getAppointmentsInRange(start: Date, end: Date, businessId: string) {
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
}

const eventsRepository = new EventsRepository();
export default eventsRepository;
