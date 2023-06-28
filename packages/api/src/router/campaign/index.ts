import { createTRPCRouter } from "../../trpc";
import { getCampaignById } from "./getCampaignById";
import { getCampaigns } from "./getCampaigns";
import { getDonators } from "./getDonators";

export const campaignRouter = createTRPCRouter({
  getCampaigns,
  getCampaignById,
  getDonators,
});
