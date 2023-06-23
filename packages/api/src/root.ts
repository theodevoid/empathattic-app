import { campaignRouter } from "./router/campaign";
import { donationRouter } from "./router/donation";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  campaign: campaignRouter,
  donation: donationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
