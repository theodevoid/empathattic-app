import { createTRPCRouter } from "../../trpc";
import { createDonation } from "./createDonation";
import { getDonationById } from "./getDonationById";
import { getDonations } from "./getDonations";

export const donationRouter = createTRPCRouter({
  createDonation,
  getDonations,
  getDonationById,
});
