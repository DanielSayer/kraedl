import businessRepository from "../../repositories/businessesRepository";

class GetBusinessNameQuery {
  async get(userId: string, businessId: string) {
    return await businessRepository.getNameById(userId, businessId);
  }
}

export const getBusinessNameQuery = new GetBusinessNameQuery();
