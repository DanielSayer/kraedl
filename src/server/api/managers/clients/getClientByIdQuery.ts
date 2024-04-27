import { TRPCClientError } from "@trpc/client";
import clientsRepository from "../../repositories/clientsRepository";

class GetClientByIdQuery {
  async get(clientId: string, businessId: string) {
    const client = await clientsRepository.getById(clientId, businessId);

    if (!client) {
      throw new TRPCClientError("Client does not exist");
    }
    return client;
  }
}

const getClientByIdQuery = new GetClientByIdQuery();
export default getClientByIdQuery;
