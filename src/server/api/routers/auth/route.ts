import { loginQuery } from "../../managers/auth/loginQuery";
import registerAdminCommand from "../../managers/auth/registerAdminCommand";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { loginSchema, userAuthSchema } from "./authSchemas";

export const authRouter = createTRPCRouter({
  registerAdmin: publicProcedure
    .input(userAuthSchema)
    .mutation(async ({ input }) => {
      await registerAdminCommand.register(input);
    }),
  login: publicProcedure.input(loginSchema).query(async ({ input }) => {
    return await loginQuery.login(input);
  }),
});
