import { DateTime } from "luxon";

export function convertDateAndTimeToDate(
  time: string,
  date: string,
  timezone: string,
) {
  const fomattedDateTime = `${date}T${time}:00`;
  const convertedDate = DateTime.fromISO(fomattedDateTime, { zone: timezone });
  const isoDate = convertedDate.toISO();
  if (!isoDate) {
    return new Date();
  }
  return new Date(isoDate);
}
