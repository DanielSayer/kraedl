import type { DateRange } from "@/types/dates";
import type { CalendarApi, DatesSetArg } from "@fullcalendar/core/index.js";
import type FullCalendar from "@fullcalendar/react";
import { useRef, useState } from "react";

const useCalendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(),
    end: new Date(),
  });

  const getCalendarApi = (): CalendarApi => {
    if (!calendarRef?.current)
      throw Error("Calendar API could not be retrieved");

    return calendarRef.current.getApi();
  };

  const datesSet = (args: DatesSetArg) => {
    if (
      args.start.toString() === dateRange.start.toString() &&
      args.end.toString() === dateRange.end.toString()
    )
      return;
    setDateRange({
      start: args.view.activeStart,
      end: args.view.activeEnd,
    });
    setSelectedDate(args.view.calendar.getDate());
  };

  const handleSelectDate = (date: Date | undefined) => {
    const calendar = getCalendarApi();
    const selectDate = date ?? new Date();
    calendar.gotoDate(selectDate);
    setSelectedDate(selectDate);
  };

  return {
    calendarRef,
    selectedDate,
    dateRange,
    datesSet,
    handleSelectDate,
  };
};

export default useCalendar;
