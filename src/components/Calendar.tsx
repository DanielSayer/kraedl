"use client";

import "@/styles/full-calendar.css";

import type { CalendarOptions } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { MutableRefObject } from "react";

export type CalendarProps = Omit<CalendarOptions, "plugins"> & {
  calendarRef: MutableRefObject<FullCalendar | null>;
};

const Calendar = ({ calendarRef, ...props }: CalendarProps) => {
  return (
    <FullCalendar
      {...props}
      locale="en-au"
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next,today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      allDaySlot={false}
      ref={calendarRef}
    />
  );
};

export default Calendar;
