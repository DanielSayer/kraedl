import clientsRepository from "../../repositories/clientsRepository";
import type { ClientRequest } from "../../routers/clients/clientsSchemas";

class CreateClientCommand {
  async create(client: ClientRequest, businessId: string) {
    return await clientsRepository.create({
      ...client,
      businessId,
    });
  }
}

const createClientCommand = new CreateClientCommand();
export default createClientCommand;
