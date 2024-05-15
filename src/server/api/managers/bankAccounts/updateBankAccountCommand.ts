import { encrypt } from "@/lib/security";
import Result from "../../common/result";
import bankAccountRepository from "../../repositories/bankAccountRepository";
import type { BankAccount } from "../../routers/bankAccounts/bankAccountSchemas";

const BSB_LENGTH = 6;
const ACCOUNT_NUMBER_MAX_LENGTH = 9;
const ACCOUNT_NUMBER_MIN_LENGTH = 6;

export async function updateBankAccountCommand(
  bankAccount: BankAccount,
  businessId: string,
): Promise<Result<void>> {
  if (bankAccount.bsb.length !== BSB_LENGTH) {
    return Result.Failure("Invalid BSB length.");
  }

  if (
    bankAccount.accountNumber.length > ACCOUNT_NUMBER_MAX_LENGTH ||
    bankAccount.accountNumber.length < ACCOUNT_NUMBER_MIN_LENGTH
  ) {
    return Result.Failure("Invalid account number length.");
  }

  const encryptedBsb = encrypt(bankAccount.bsb);
  const encryptedAccountNumber = encrypt(bankAccount.accountNumber);

  await bankAccountRepository.insertOrUpdate({
    accountName: bankAccount.accountName,
    bsb: encryptedBsb,
    accountNumber: encryptedAccountNumber,
    businessId,
  });

  return Result.Success<void>(undefined);
}
