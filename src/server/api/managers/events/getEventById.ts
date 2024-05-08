import eventsRepository from "../../repositories/eventsRepository";

export async function getEventById(eventId: string, businessId: string) {
  return await eventsRepository.getById(eventId, businessId);
}
