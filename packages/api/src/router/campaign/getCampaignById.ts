import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { eq } from "@empathattic/db/drizzle-orm";
import { campaign } from "@empathattic/db/schemas";

import { publicProcedure } from "../../trpc";

export const getCampaignById = publicProcedure
  .input(
    z.object({
      id: z.string().min(1),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { db } = ctx;
    const { id } = input;

    const campaignById = await db
      .select()
      .from(campaign)
      .where(eq(campaign.id, id));

    if (!campaignById.length) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "campaign not found",
      });
    }

    return campaignById[0];
  });
