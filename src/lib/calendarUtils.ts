import type { InvoiceStatus } from "@/types/invoices";

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

export function getEventBackgroundStyles(status: InvoiceStatus) {
  if (status === "OVERDUE") {
    return [
      "cursor-pointer rounded-md border-destructive bg-red-300 p-0.5 hover:bg-red-400",
    ];
  }

  if (status === "PAID") {
    return [
      "cursor-pointer rounded-md border-green-800 bg-green-300 p-0.5 hover:bg-green-400",
    ];
  }
  return [
    "cursor-pointer rounded-md border-primary bg-violet-300 p-0.5 hover:bg-violet-400",
  ];
}

export function getEventTextStyles(status: InvoiceStatus) {
  if (status === "OVERDUE") {
    return "#B91C1C";
  }

  if (status === "PAID") {
    return "#15803D";
  }
  return "#6D28D9";
}
