import businessRepository from '../../repositories/businessesRepository'

class GetBusinessNameQuery {
  async get(businessId: string) {
    return await businessRepository.getNameById(businessId)
  }
}

export const getBusinessNameQuery = new GetBusinessNameQuery()
