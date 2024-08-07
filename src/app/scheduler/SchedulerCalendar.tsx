'use client'

import { Calendar } from '@/components/Calendar'
import useWindowSize from '@/hooks/useWindowSize'
import {
  getEventBackgroundStyles,
  getEventTextStyles,
  getSchedulerCalendarHeight,
} from '@/lib/calendarUtils'
import type { Event } from '@/types/events'
import type { DatesSetArg, EventClickArg } from '@fullcalendar/core'
import type FullCalendar from '@fullcalendar/react'
import { useRouter } from 'next/navigation'
import type { MutableRefObject } from 'react'

type SchedulerCalendarProps = {
  initialDate?: Date
  calendarRef: MutableRefObject<FullCalendar | null>
  datesSet: (args: DatesSetArg) => void
  events: Event[] | undefined
}

const SchedulerCalendar = ({ events, ...props }: SchedulerCalendarProps) => {
  const router = useRouter()
  const { height } = useWindowSize()
  const calendarHeight = getSchedulerCalendarHeight(height)

  const handleClickEvent = (e: EventClickArg) => {
    if (!e.event.start) return
    const formattedDate = e.event.start.toISOString()
    let route = `/quote-builder/${e.event.extendedProps.eventId}/${formattedDate}`
    if (e.event.extendedProps.exceptionId) {
      route += `/${e.event.extendedProps.exceptionId}`
    }
    router.push(route)
  }

  const getCalendarTitle = (event: Event) => {
    if (event.name === 'Untitled Event') {
      return `${event.clientName} - ${event.name}`
    }
    return `${event.name} - ${event.clientName}`
  }

  const fullCalendarEvents = events
    ? events.map((e) => ({
        title: getCalendarTitle(e),
        start: e.startTime,
        end: e.endTime,
        classNames: getEventBackgroundStyles(e.status),
        textColor: getEventTextStyles(e.status),
        extendedProps: {
          eventId: e.id,
          exceptionId: e.exceptionId,
        },
      }))
    : []

  return (
    <Calendar
      eventClick={handleClickEvent}
      events={fullCalendarEvents}
      height={calendarHeight}
      nowIndicator
      dayMaxEvents={3}
      {...props}
    />
  )
}

export default SchedulerCalendar
