import { createTRPCRouter } from "../../trpc";
import { createDonation } from "./createDonation";
import { getDonations } from "./getDonations";

export const donationRouter = createTRPCRouter({
  createDonation,
  getDonations,
});
