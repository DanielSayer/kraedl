import { addDays, addMonths, lastDayOfWeek, startOfMonth } from "date-fns";
import dashboardRepository from "../../repositories/dashboardRespository";

export const getUpcomingEventsQuery = async (businessId: string) => {
  return await dashboardRepository.getUpcomingAppointments(businessId);
};

export const getNumberOfEventsLeftInWeekQuery = async (businessId: string) => {
  const today = new Date();
  const lastDay = addDays(lastDayOfWeek(today, { weekStartsOn: 1 }), 1);
  return await dashboardRepository.getNumberOfEventsInDateRange(
    today,
    lastDay,
    businessId,
  );
};

export const getNumberOfEventsInLastMonth = async (businessId: string) => {
  const today = new Date();
  const startOfTheMonth = startOfMonth(today);
  const thisTimeLastMonth = addMonths(today, -1);
  const startOfLastMonth = startOfMonth(thisTimeLastMonth);

  const thisMonthsEvents =
    await dashboardRepository.getNumberOfEventsInDateRange(
      startOfTheMonth,
      today,
      businessId,
    );

  const lastMonthsEvents =
    await dashboardRepository.getNumberOfEventsInDateRange(
      startOfLastMonth,
      thisTimeLastMonth,
      businessId,
    );

  if (lastMonthsEvents === 0) {
    return {
      total: thisMonthsEvents,
      comparison: "",
    };
  }

  const ratio = Math.round((thisMonthsEvents * 100) / lastMonthsEvents);
  const comparison =
    ratio < 100
      ? `-${100 - ratio}% from last month`
      : `+${ratio - 100}% from last month`;

  return {
    total: thisMonthsEvents,
    comparison,
  };
};
