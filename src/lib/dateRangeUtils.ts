import { format } from "date-fns";

export const formatTimeRange = (startTime: Date, endTime: Date) => {
  const fomattedStart = format(startTime, "hh:mm a");
  const formattedEnd = format(endTime, "hh:mm a");

  return `${fomattedStart} - ${formattedEnd}`;
};
