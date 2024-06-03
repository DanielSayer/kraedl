import { bankDetailsSchema } from '@/lib/validations/bankAccounts'
import { fromResult } from '../../common/fromResult'
import { getBankAccountQuery } from '../../managers/bankAccounts/getBankAccountQuery'
import { updateBankAccountCommand } from '../../managers/bankAccounts/updateBankAccountCommand'
import { adminProcedure, createTRPCRouter } from '../../trpc'

export const bankAccountsRouter = createTRPCRouter({
  getByBusinessId: adminProcedure.query(async ({ ctx }) => {
    return await getBankAccountQuery(ctx.businessId)
  }),
  updateBankAccountDetails: adminProcedure
    .input(bankDetailsSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await updateBankAccountCommand(input, ctx.businessId)
      return fromResult(result)
    }),
})
