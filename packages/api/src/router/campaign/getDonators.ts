import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { eq, sql } from "@empathattic/db/drizzle-orm";
import { campaign, donation } from "@empathattic/db/schemas";

import { protectedProcedure } from "../../trpc";

export const getDonators = protectedProcedure
  .input(
    z.object({
      campaignId: z.string().min(1),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { db } = ctx;
    const { campaignId } = input;

    const campaignById = await db.query.campaign.findFirst({
      where: eq(campaign.id, campaignId),
    });

    if (!campaignById) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "campaign not found",
      });
    }

    const donatorCount = (
      await db
        .select({ count: sql<string>`count(distinct(user_id))` })
        .from(donation)
        .groupBy(donation.userId)
        .where(eq(donation.campaignId, campaignId))
    )[0];

    console.log(donatorCount);

    return { donatorCount: parseInt(donatorCount?.count || "0") };
  });
