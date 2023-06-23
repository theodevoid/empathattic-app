import { createTRPCRouter } from "../../trpc";
import { getCampaignById } from "./getCampaignById";
import { getCampaigns } from "./getCampaigns";

export const campaignRouter = createTRPCRouter({
  getCampaigns,
  getCampaignById,
});
