import { addDays, addMonths, lastDayOfWeek, startOfMonth } from 'date-fns'
import dashboardRepository from '../../repositories/dashboardRespository'
import { eventsService } from '../../services/eventsService'

export const getUpcomingEventsQuery = async (businessId: string) => {
  return await dashboardRepository.getUpcomingAppointments(businessId)
}

export const getNumberOfEventsLeftInWeekQuery = async (businessId: string) => {
  const today = new Date()
  const lastDay = addDays(lastDayOfWeek(today, { weekStartsOn: 1 }), 1)
  return await dashboardRepository.getNumberOfEventsInDateRange(
    today,
    lastDay,
    businessId,
  )
}

export const getNumberOfEventsInLastMonth = async (businessId: string) => {
  const today = new Date()
  const startOfTheMonth = startOfMonth(today)
  const thisTimeLastMonth = addMonths(today, -1)
  const startOfLastMonth = startOfMonth(thisTimeLastMonth)

  const thisMonthsEvents = (
    await eventsService.getEventsInRange(startOfTheMonth, today, businessId)
  ).length

  const lastMonthsEvents = (
    await eventsService.getEventsInRange(
      startOfLastMonth,
      thisTimeLastMonth,
      businessId,
    )
  ).length

  if (lastMonthsEvents === 0) {
    return {
      total: thisMonthsEvents,
      comparison: '',
    }
  }

  const ratio = Math.round((thisMonthsEvents * 100) / lastMonthsEvents)
  const comparison =
    ratio < 100
      ? `-${100 - ratio}% from this time last month`
      : `+${ratio - 100}% from this time last month`

  return {
    total: thisMonthsEvents,
    comparison,
  }
}
