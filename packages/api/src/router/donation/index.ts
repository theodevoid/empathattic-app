import { createTRPCRouter } from "../../trpc";
import { createDonation } from "./createDonation";

export const donationRouter = createTRPCRouter({
  createDonation,
});
