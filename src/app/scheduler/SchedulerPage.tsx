"use client";

import DialogButton from "@/components/DialogButton";
import { Icons } from "@/components/Icons";
import { Calendar } from "@/components/ui/calendar";
import SchedulerCalendar from "./SchedulerCalendar";
import useCalendar from "./useCalendar";
import CreateEventDialog from "./CreateEventDialog";

const SchedulerPage = () => {
  const { selectedDate, datesSet, handleSelectDate, calendarRef } =
    useCalendar();
  return (
    <div className="flex gap-8">
      <div>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Scheduler</h1>
            <DialogButton
              buttonContent={
                <>
                  <Icons.add className="me-2" /> Create
                </>
              }
            >
              <CreateEventDialog />
            </DialogButton>
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
