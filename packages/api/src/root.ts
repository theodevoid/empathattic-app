import { campaignRouter } from "./router/campaign";
import { donationRouter } from "./router/donation";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  campaign: campaignRouter,
  donation: donationRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
