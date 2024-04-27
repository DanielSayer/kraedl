import { db } from "@/server/db";
import { clients } from "@/server/db/schema";
import { single } from "../common/helperMethods/arrayHelpers";

type ClientDto = {
  name: string;
  email: string;
  phoneNumber: string;
  businessId: string;
};

class ClientsRepository {
  async create(client: ClientDto) {
    const id = await db
      .insert(clients)
      .values({
        name: client.name,
        email: client.email,
        phoneNumber: client.phoneNumber,
        businessId: client.businessId,
      })
      .returning({ id: clients.id });

    return single(id);
  }
}

const clientsRepository = new ClientsRepository();
export default clientsRepository;
