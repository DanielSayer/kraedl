import { userRegisterSchema } from "@/lib/validations/auth";
import registerAdminCommand from "../../managers/auth/registerAdminCommand";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const authRouter = createTRPCRouter({
  registerAdmin: publicProcedure
    .input(userRegisterSchema)
    .mutation(async ({ input }) => {
      await registerAdminCommand.register(input);
    }),
});
