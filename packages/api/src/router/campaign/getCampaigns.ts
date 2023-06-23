import { z } from "zod";

import { and, desc, eq } from "@empathattic/db/drizzle-orm";
import { campaign } from "@empathattic/db/schemas";

import { publicProcedure } from "../../trpc";

export const getCampaigns = publicProcedure
  .input(
    z.object({
      categoryId: z.string().optional(),
      sort: z.enum(["newest"]).optional(),
      id: z.string().optional(),
      limit: z.number().min(1).default(10),
      page: z.number().min(1).default(1),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { db } = ctx;
    const { categoryId, id, limit } = input;

    if (id) {
      const campaignById = await db
        .select()
        .from(campaign)
        .where(eq(campaign.id, id));

      return campaignById;
    }

    const campaignFilters = [];

    if (categoryId) {
      campaignFilters.push(eq(campaign.categoryId, categoryId));
    }

    const campaigns = await db
      .select()
      .from(campaign)
      .where(and(...campaignFilters))
      .orderBy(desc(campaign.createdAt))
      .limit(limit);

    return campaigns;
  });
