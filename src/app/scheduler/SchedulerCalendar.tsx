"use client";

import Calendar from "@/components/Calendar";
import useWindowSize from "@/hooks/useWindowSize";
import { getSchedulerCalendarHeight } from "@/lib/calendarUtils";

const SchedulerCalendar = () => {
  const { height } = useWindowSize();
  const calendarHeight = getSchedulerCalendarHeight(height);

  return <Calendar height={calendarHeight} />;
};

export default SchedulerCalendar;
