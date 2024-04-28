"use client";

import "@/styles/full-calendar.css";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  return (
    <FullCalendar
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
