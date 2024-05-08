"use client";

import { Calendar } from "@/components/Calendar";
import useWindowSize from "@/hooks/useWindowSize";
import { getSchedulerCalendarHeight } from "@/lib/calendarUtils";
import type { Event } from "@/types/events";
import type { DatesSetArg } from "@fullcalendar/core";
import type FullCalendar from "@fullcalendar/react";
import { useRouter } from "next/navigation";
import type { MutableRefObject } from "react";

type SchedulerCalendarProps = {
  initialDate?: Date;
  calendarRef: MutableRefObject<FullCalendar | null>;
  datesSet: (args: DatesSetArg) => void;
  events: Event[] | undefined;
};

const SchedulerCalendar = ({ events, ...props }: SchedulerCalendarProps) => {
  const router = useRouter();
  const { height } = useWindowSize();
  const calendarHeight = getSchedulerCalendarHeight(height);

  const fullCalendarEvents = events
    ? events.map((e) => ({
        id: e.id,
        title: e.name ? e.name : e.clientId,
        start: e.startTime,
        end: e.endTime,
      }))
    : [];

  return (
    <Calendar
      eventClick={(e) => {
        router.push(`/quote-builder/${e.event.id}`);
      }}
      events={fullCalendarEvents}
      height={calendarHeight}
      nowIndicator
      {...props}
    />
  );
};

export default SchedulerCalendar;
