import eventsRepository from "../../repositories/eventsRepository";
import type { GetEventsInRangeRequest } from "../../routers/events/eventsSchemas";

export async function getEventsInRange(
  range: GetEventsInRangeRequest,
  businessId: string,
) {
  const start = new Date(range.startTime);
  const end = new Date(range.endTime);

  const a = await eventsRepository.getAppointmentsInRange(
    start,
    end,
    businessId,
  );

  return a;
}
