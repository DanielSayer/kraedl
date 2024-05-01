import useProtectedRoute from "@/hooks/useProtectedRoute";
import SchedulerPage from "./SchedulerPage";

export default async function Scheduler() {
  await useProtectedRoute();
  return (
    <div className="px-10 pt-4">
      <SchedulerPage />
    </div>
  );
}
