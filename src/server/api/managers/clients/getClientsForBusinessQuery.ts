import clientsRepository from "../../repositories/clientsRepository";

class GetClientsForBusinessQuery {
  async get(businessId: string) {
    return await clientsRepository.getClientsForBusiness(businessId);
  }
}

const getClientsForBusinessQuery = new GetClientsForBusinessQuery();
export default getClientsForBusinessQuery;
