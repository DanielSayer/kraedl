import type { EventStatus } from "@/types/events";

const TW_MD_BREAKPOINT = 768;

export function getSchedulerCalendarHeight(windowHeight: number) {
  const navbarHeight = 56;
  const bottomPadding = 35;
  return windowHeight - (navbarHeight + bottomPadding);
}

export function getCalendarProps(width: number) {
  if (width < TW_MD_BREAKPOINT) {
    return {
      headerToolbar: {
        left: "title",
        right: "prev,next,today",
      },
    };
  }

  return {
    headerToolbar: {
      left: "prev,next,today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
  };
}

export function getEventBackgroundStyles(status: EventStatus) {
  if (status === "DRAFT") {
    return [
      "cursor-pointer rounded-md border-blue-500 bg-blue-200 p-0.5 hover:bg-blue-300",
    ];
  }

  return [
    "cursor-pointer rounded-md border-primary bg-violet-300 p-0.5 hover:bg-violet-400",
  ];
}

export function getEventTextStyles(status: EventStatus) {
  if (status === "DRAFT") {
    return "#1D4ED8";
  }

  return "#6D28D9";
}
