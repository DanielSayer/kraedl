"use client";

import "@/styles/full-calendar.css";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { CalendarOptions } from "@fullcalendar/core/index.js";

type CalendarProps = Omit<CalendarOptions, "plugins">;

const Calendar = (props: CalendarProps) => {
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
    />
  );
};

export default Calendar;
