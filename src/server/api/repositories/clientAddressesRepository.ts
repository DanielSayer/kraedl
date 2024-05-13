import { db } from "@/server/db";
import { clientAddresses } from "@/server/db/schema";
import type { State } from "../common/valueObjects/state";

type ClientAddressDto = {
  clientId: string;
  streetAddress: string;
  suburb: string;
  postcode: string;
  city: string;
  state: State;
};

class ClientAddressesRepository {
  async insertOrUpdate(clientAddress: ClientAddressDto) {
    return await db
      .insert(clientAddresses)
      .values(clientAddress)
      .onConflictDoUpdate({
        target: clientAddresses.clientId,
        set: {
          streetAddress: clientAddress.streetAddress,
          suburb: clientAddress.suburb,
          city: clientAddress.city,
          postcode: clientAddress.postcode,
          state: clientAddress.state,
        },
      });
  }
}

const clientAddressesRepository = new ClientAddressesRepository();
export default clientAddressesRepository;
