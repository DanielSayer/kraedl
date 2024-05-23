import dashboardRepository from "../../repositories/dashboardRespository";

export const getUpcomingEventsQuery = async (businessId: string) => {
  return await dashboardRepository.getUpcomingAppointments(businessId);
};

export const getNumberOfEventsLeftInWeekQuery = async (businessId: string) => {
  return await dashboardRepository.getNumberOfEventsLeftInWeek(businessId);
};
