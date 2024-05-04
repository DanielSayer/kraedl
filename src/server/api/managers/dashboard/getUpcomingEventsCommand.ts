import eventsRepository from "../../repositories/eventsRepository";

export const getUpcomingEventsCommand = async (businessId: string) => {
  return await eventsRepository.getUpcomingAppointments(businessId);
};
