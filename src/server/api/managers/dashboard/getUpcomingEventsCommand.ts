import dashboardRepository from "../../repositories/dashboardRespository";

export const getUpcomingEventsCommand = async (businessId: string) => {
  return await dashboardRepository.getUpcomingAppointments(businessId);
};
