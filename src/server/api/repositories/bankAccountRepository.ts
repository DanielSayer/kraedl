import { db } from '@/server/db'
import { bankAccounts } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

type BankAccountDto = {
  businessId: string
  accountName: string
  bsb: string
  accountNumber: string
}

class BankAccountRepository {
  async getByBusinessId(businessId: string) {
    return await db.query.bankAccounts.findFirst({
      where: eq(bankAccounts.businessId, businessId),
    })
  }
  async insertOrUpdate(bankAccount: BankAccountDto) {
    await db
      .insert(bankAccounts)
      .values(bankAccount)
      .onConflictDoUpdate({
        target: bankAccounts.businessId,
        set: {
          accountName: bankAccount.accountName,
          bsb: bankAccount.bsb,
          accountNumber: bankAccount.accountNumber,
        },
      })
  }
}

const bankAccountRepository = new BankAccountRepository()
export default bankAccountRepository
