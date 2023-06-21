import { campaignRouter } from "./router/campaign";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  campaign: campaignRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
