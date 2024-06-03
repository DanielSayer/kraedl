'use client'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import useLoadClientsOptions from '@/hooks/useLoadClientOptions'
import { useState } from 'react'
import CreateEventDialog from './CreateEventDialog'
import SchedulerCalendar from './SchedulerCalendar'
import useCalendar from './useCalendar'
import { api } from '@/trpc/react'
import { Card } from '@/components/ui/card'

const SchedulerPage = () => {
  const { selectedDate, datesSet, handleSelectDate, calendarRef, dateRange } =
    useCalendar()

  const { data, refetch } = api.events.getInRange.useQuery({
    startTime: dateRange.start.toString(),
    endTime: dateRange.end.toString(),
  })

  return (
    <div className="flex gap-8">
      <div className="hidden lg:block">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Scheduler</h1>
          <CreateEventButton refetch={refetch} />
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          month={selectedDate}
          onSelect={handleSelectDate}
        />
        <Card className="px-2 py-4">
          <div className="space-y-2">
            <div className="mb-3 text-sm font-semibold">Key:</div>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-4 w-4 rounded bg-blue-300" /> Draft
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-4 w-4 rounded bg-violet-400" /> Set Up
            </span>
          </div>
        </Card>
      </div>
      <div className="w-full">
        <CreateEventButton refetch={refetch} className="lg:hidden" />
        <SchedulerCalendar
          calendarRef={calendarRef}
          datesSet={datesSet}
          initialDate={selectedDate}
          events={data}
        />
      </div>
    </div>
  )
}

type CreateEventButtonProps = {
  className?: string
  refetch: () => void
}

const CreateEventButton = ({ refetch, className }: CreateEventButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggle = () => setIsOpen(!isOpen)
  const clients = useLoadClientsOptions()
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild onClick={toggle}>
        <div className={className}>
          <Button
            className="absolute bottom-10 right-10 z-50 aspect-square h-14 w-14 rounded-full shadow-lg md:bottom-14 md:right-14 lg:hidden"
            size="icon"
          >
            <Icons.add className="h-8 w-8" />
          </Button>
          <Button className="hidden lg:flex">
            <Icons.add className="me-2" /> Create
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <CreateEventDialog {...clients} toggle={toggle} refetch={refetch} />
      </DialogContent>
    </Dialog>
  )
}

export default SchedulerPage
