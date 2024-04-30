import eventsRepository from "../../repositories/eventsRepository";
import type { EventRequest } from "../../routers/events/eventsSchemas";

export async function createEventCommand(
  request: EventRequest,
  businessId: string,
) {
  console.log(request);

  return;
  // return await eventsRepository.create({
  //   ...request,
  //   businessId: businessId,
  // });
}
