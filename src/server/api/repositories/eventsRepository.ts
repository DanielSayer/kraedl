import { db } from "@/server/db";
import { events } from "@/server/db/schema";
import { single } from "../common/helperMethods/arrayHelpers";

type EventDto = {
  name?: string;
  clientId: string;
  startTime: Date;
  endTime: Date;
  businessId: string;
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
}

const eventsRepository = new EventsRepository();
export default eventsRepository;
