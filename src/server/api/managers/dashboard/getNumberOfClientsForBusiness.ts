import clientsRepository from '../../repositories/clientsRepository'

export const getNumberOfClientsForBusinessQuery = async (
  businessId: string,
) => {
  return await clientsRepository.getNumberOfClientsForBusiness(businessId)
}
