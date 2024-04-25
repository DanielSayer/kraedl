import businessManager from "../../managers/business/createBusinessManager";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { businessRegisterSchema } from "./businessSchemas";

export const businessRouter = createTRPCRouter({
  register: publicProcedure
    .input(businessRegisterSchema)
    .mutation(async ({ input }) => {
      const result = businessManager.create(input);
      return result;
    }),
});
