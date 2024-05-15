import { getBankAccountQuery } from "../../managers/bankAccounts/getBankAccountQuery";
import { updateBankAccountCommand } from "../../managers/bankAccounts/updateBankAccountCommand";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { bankDetailsSchema } from "./bankAccountSchemas";

export const bankAccountsRouter = createTRPCRouter({
  getByBusinessId: adminProcedure.query(async ({ ctx }) => {
    return await getBankAccountQuery(ctx.businessId);
  }),
  updateBankAccountDetails: adminProcedure
    .input(bankDetailsSchema)
    .mutation(async ({ input, ctx }) => {
      return await updateBankAccountCommand(input, ctx.businessId);
    }),
});
