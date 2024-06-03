import eventPricingRepository from '../../repositories/eventPricingRepository'

export async function getEventPricingsByEventIdQuery(eventId: string) {
  return await eventPricingRepository.getByEventId(eventId)
}
