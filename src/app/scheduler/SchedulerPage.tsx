"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useLoadClientsOptions from "@/hooks/useLoadClientOptions";
import { useState } from "react";
import CreateEventDialog from "./CreateEventDialog";
import SchedulerCalendar from "./SchedulerCalendar";
import useCalendar from "./useCalendar";

const SchedulerPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  const clients = useLoadClientsOptions();
  const { selectedDate, datesSet, handleSelectDate, calendarRef } =
    useCalendar();

  return (
    <div className="flex gap-8">
      <div>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Scheduler</h1>
            <Dialog open={isOpen} onOpenChange={toggle}>
              <DialogTrigger asChild onClick={toggle}>
                <Button>
                  <Icons.add className="me-2" /> Create
                </Button>
              </DialogTrigger>
              <DialogContent>
                <CreateEventDialog {...clients} toggle={toggle} />
              </DialogContent>
            </Dialog>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelectDate}
          />
        </div>
      </div>
      <div className="w-full">
        <SchedulerCalendar
          calendarRef={calendarRef}
          datesSet={datesSet}
          initialDate={selectedDate}
        />
      </div>
    </div>
  );
};

export default SchedulerPage;
