import useProtectedRoute from '@/hooks/useProtectedRoute'
import SchedulerPage from './SchedulerPage'

export default async function Scheduler() {
  await useProtectedRoute()
  return (
    <div className="px-4 pt-4 md:px-10">
      <SchedulerPage />
    </div>
  )
}
