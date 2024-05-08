import { format } from "date-fns";

export const formatTimeRange = (startTime: Date, endTime: Date) => {
  const fomattedStart = format(startTime, "hh:mm a");
  const formattedEnd = format(endTime, "hh:mm a");

  return `${fomattedStart} - ${formattedEnd}`;
};

export const formatDateRange = (startTime: Date, endTime: Date) => {
  const isSameDay = startTime.toDateString() === endTime.toDateString();

  if (isSameDay) {
    return `${format(startTime, "dd MMM yyyy")} | ${formatTimeRange(startTime, endTime)}`;
  }
  return "Multi day range, not implemented yet :)";
};
