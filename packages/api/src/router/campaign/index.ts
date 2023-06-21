import { createTRPCRouter } from "../../trpc";
import { getCampaigns } from "./getCampaigns";

export const campaignRouter = createTRPCRouter({
  getCampaigns,
});
