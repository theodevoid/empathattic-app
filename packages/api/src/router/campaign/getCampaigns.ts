import { eq } from "drizzle-orm";
import { z } from "zod";

import { campaign } from "@empathattic/db/schemas";

import { publicProcedure } from "../../trpc";

export const getCampaigns = publicProcedure
  .input(
    z.object({
      categoryId: z.string().optional(),
      sort: z.enum(["newest"]).optional(),
      id: z.string().optional(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { db } = ctx;
    const { categoryId, id, sort } = input;

    if (id) {
      const campaignById = db
        .select()
        .from(campaign)
        .where(eq(campaign.id, id));
    }
  });
