import { db } from "@/server/db";
import { clients } from "@/server/db/schema";
import { single } from "../common/helperMethods/arrayHelpers";
import { and, eq } from "drizzle-orm";

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
  async getById(clientId: string, businessId: string) {
    const client = await db.query.clients.findFirst({
      where: and(eq(clients.id, clientId), eq(clients.businessId, businessId)),
    });
    return client;
  }
}

const clientsRepository = new ClientsRepository();
export default clientsRepository;
