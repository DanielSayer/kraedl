import { decrypt } from "@/lib/security";
import bankAccountRepository from "../../repositories/bankAccountRepository";

export async function getBankAccountQuery(businessId: string) {
  const bankAccount = await bankAccountRepository.getByBusinessId(businessId);

  if (!bankAccount) return;
  const decryptedBsb = decrypt(bankAccount.bsb);
  const decryptedAccountNumber = decrypt(bankAccount.accountNumber);

  return {
    accountName: bankAccount.accountName,
    bsb: decryptedBsb,
    accountNumber: decryptedAccountNumber,
  };
}
