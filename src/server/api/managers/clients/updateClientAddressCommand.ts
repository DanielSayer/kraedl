import { state, type State } from "../../common/valueObjects/state";
import clientAddressesRepository from "../../repositories/clientAddressesRepository";
import clientsRepository from "../../repositories/clientsRepository";

import type { editClientAddressSchema } from "@/lib/validations/clients";
import type { z } from "zod";

type ClientAddressRequest = z.infer<typeof editClientAddressSchema>;

class UpdateClientAddressCommand {
  async update(client: ClientAddressRequest, businessId: string) {
    const expectedClient = await clientsRepository.getById(
      client.id,
      businessId,
    );
    if (!expectedClient) {
      throw new Error("Unable to fetch client");
    }

    const isStateValid = state.validate(client.state);
    if (!isStateValid) {
      throw new Error("Something went wrong");
    }

    await clientAddressesRepository.insertOrUpdate({
      clientId: client.id,
      ...client,
      state: client.state as State,
    });
  }
}

const updateClientAddressCommand = new UpdateClientAddressCommand();
export default updateClientAddressCommand;
