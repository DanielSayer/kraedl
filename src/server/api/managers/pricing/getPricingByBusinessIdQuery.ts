import pricingRepository from '../../repositories/pricingRepository'

export async function getPricingByBusinessIdQuery(businessId: string) {
  const existingPricings = await pricingRepository.getByBusinessId(businessId)
  if (existingPricings.length === 0) {
    return defaultSetPrices.map((x) => ({ ...x, businessId }))
  }
  return existingPricings
}

const defaultSetPrices = [
  {
    id: '1',
    label: '30min Session',
    price: '50',
  },
  {
    id: '2',
    label: '1hr Session',
    price: '80',
  },
  {
    id: '3',
    label: 'All day Session',
    price: '300',
  },
]
