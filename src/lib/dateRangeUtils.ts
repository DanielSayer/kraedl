import { format, parse } from 'date-fns'

export const formatDateAndTimeRange = (
  date: string,
  startTime: string,
  endTime: string,
) => {
  const startDate = parse(startTime, 'HH:mm', date)
  const endDate = parse(endTime, 'HH:mm', date)

  return formatDateRange(startDate, endDate)
}

export const formatDateRangeToTime = (startTime: Date, endTime: Date) => {
  const fomattedStart = format(startTime, 'hh:mm a')
  const formattedEnd = format(endTime, 'hh:mm a')

  return `${fomattedStart} - ${formattedEnd}`
}

export function formatDateRange(startTime: string, endTime: string): string
export function formatDateRange(startTime: Date, endTime: Date): string
export function formatDateRange(
  startTime: string | Date,
  endTime: string | Date,
) {
  const startDate = new Date(startTime)
  const endDate = new Date(endTime)
  const isSameDay = startDate.toDateString() === endDate.toDateString()

  if (isSameDay) {
    return `${format(startTime, 'dd MMM yyyy')} | ${formatDateRangeToTime(startDate, endDate)}`
  }
  return 'Multi day range, not implemented yet :)'
}
