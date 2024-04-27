import registerAdminCommand from "../../managers/auth/registerAdminCommand";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { userAuthSchema } from "./authSchemas";

export const authRouter = createTRPCRouter({
  registerAdmin: publicProcedure
    .input(userAuthSchema)
    .mutation(async ({ input }) => {
      await registerAdminCommand.register(input);
    }),
});
