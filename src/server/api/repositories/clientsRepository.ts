import { db } from "@/server/db";
import { clients } from "@/server/db/schema";
import { and, asc, count, eq } from "drizzle-orm";
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
  async getById(clientId: string, businessId: string) {
    const client = await db.query.clients.findFirst({
      where: and(eq(clients.id, clientId), eq(clients.businessId, businessId)),
    });
    return client;
  }
  async getClientsForBusiness(businessId: string) {
    return await db.query.clients.findMany({
      where: eq(clients.businessId, businessId),
      with: {
        clientAddresses: {
          columns: {
            streetAddress: true,
            suburb: true,
          },
        },
      },
      orderBy: asc(clients.name),
    });
  }
  async getNumberOfClientsForBusiness(businessId: string) {
    const numberOfClients = await db
      .select({ count: count() })
      .from(clients)
      .where(eq(clients.businessId, businessId));

    return single(numberOfClients).count;
  }
}

const clientsRepository = new ClientsRepository();
export default clientsRepository;
