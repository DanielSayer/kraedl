import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { businessRouter } from "./routers/business/route";
import { authRouter } from "./routers/auth/route";
import { clientRouter } from "./routers/clients/route";
import { eventRouter } from "./routers/events/route";
import { dashboardRouter } from "./routers/dashboard/route";
import { pricingRouter } from "./routers/pricing/route";
import { eventPricingRouter } from "./routers/eventPricing/route";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  business: businessRouter,
  clients: clientRouter,
  dashboard: dashboardRouter,
  events: eventRouter,
  eventPricing: eventPricingRouter,
  pricing: pricingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
