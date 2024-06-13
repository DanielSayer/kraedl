import eventPricingRepository from '../../repositories/events/eventSeries/eventPricingRepository'

export async function getEventPricingsByEventIdQuery(eventId: string) {
  return await eventPricingRepository.getByEventId(eventId)
}
