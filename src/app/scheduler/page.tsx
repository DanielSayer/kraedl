import DialogButton from "@/components/DialogButton";
import { Icons } from "@/components/Icons";
import SchedulerCalendar from "./SchedulerCalendar";

export default function Scheduler() {
  return (
    <div className="container p-2">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Scheduler</h1>
        <DialogButton
          buttonContent={
            <>
              <Icons.add className="me-2" />
              New Appointment
            </>
          }
        >
          Stuff
        </DialogButton>
      </div>
      <SchedulerCalendar />
    </div>
  );
}
