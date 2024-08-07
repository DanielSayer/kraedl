import eventExceptionsPricingRepository from '../../repositories/events/eventExceptions/eventExceptionsPricingRepository'
import eventPricingRepository from '../../repositories/events/eventSeries/eventPricingRepository'

export async function getEventPricingsByEventIdQuery(
  eventId: string,
  exceptionId: string | undefined,
) {
  if (exceptionId) {
    return await eventExceptionsPricingRepository.getByEventId(exceptionId)
  }
  return await eventPricingRepository.getByEventId(eventId)
}
