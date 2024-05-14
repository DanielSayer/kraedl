import clientAddressesRepository from "../../repositories/clientAddressesRepository";
import clientsRepository from "../../repositories/clientsRepository";

export async function getClientAddressByIdQuery(
  clientId: string,
  businessId: string,
) {
  const clientToFetch = await clientsRepository.getById(clientId, businessId);
  if (!clientToFetch) {
    throw new Error("Unable to fetch client for update");
  }

  await clientAddressesRepository.getByClientId(clientId);
}
