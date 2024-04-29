"use client";

import Calendar, { type CalendarProps } from "@/components/Calendar";
import useWindowSize from "@/hooks/useWindowSize";
import { getSchedulerCalendarHeight } from "@/lib/calendarUtils";

const SchedulerCalendar = (props: CalendarProps) => {
  const { height } = useWindowSize();
  const calendarHeight = getSchedulerCalendarHeight(height);

  return <Calendar height={calendarHeight} nowIndicator {...props} />;
};

export default SchedulerCalendar;
