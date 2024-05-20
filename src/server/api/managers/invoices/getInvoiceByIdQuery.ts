import { TRPCClientError } from "@trpc/client";
import { invoicesRepository } from "../../repositories/invoicesRepository";
import businessRepository from "../../repositories/businessesRepository";
import clientsRepository from "../../repositories/clientsRepository";
import clientAddressesRepository from "../../repositories/clientAddressesRepository";
import { decrypt } from "@/lib/security";

export const getInvoiceByIdQuery = async (
  invoiceId: string,
  businessId: string,
) => {
  const invoice = await invoicesRepository.getInvoiceById(
    invoiceId,
    businessId,
  );

  if (invoice === null) {
    throw new TRPCClientError(`Invoice ${invoiceId} not found`);
  }

  const client = await clientsRepository.getById(invoice.clientId, businessId);
  if (client === null || client === undefined) {
    throw new TRPCClientError(`Client ${invoice.clientId} not found`);
  }
  const clientAddress = await clientAddressesRepository.getByClientId(
    invoice.clientId,
  );

  const business = await businessRepository.getBillingInfo(businessId);
  const businessDecoded = {
    ...business,
    bankAccount: {
      ...business.bankAccount,
      bsb: decrypt(business.bankAccount?.bsb ?? ""),
      accountNumber: decrypt(business.bankAccount?.accountNumber ?? ""),
    },
  };
  return {
    ...invoice,
    business: businessDecoded,
    client: {
      ...client,
      clientAddress: clientAddress,
    },
  };
};
