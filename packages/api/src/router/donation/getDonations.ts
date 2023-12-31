import { z } from "zod";

import { and, desc, eq, SQL } from "@empathattic/db/drizzle-orm";
import { donation, DonationStatus } from "@empathattic/db/schemas";

import { protectedProcedure } from "../../trpc";

export const getDonations = protectedProcedure
  .input(
    z.object({
      status: z
        .enum([
          "ALL",
          DonationStatus.AWAITING_PAYMENT,
          DonationStatus.FAIL,
          DonationStatus.SUCCESS,
        ])
        .default("ALL"),
      cursor: z.number().default(1),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { db, user } = ctx;
    const { status, cursor } = input;

    const LIMIT_PER_PAGE = 5;

    let whereCondition: SQL<unknown> = eq(donation.userId, user.id);

    if (status !== "ALL") {
      whereCondition = and(
        eq(donation.userId, user.id),
        eq(donation.status, status),
      ) as SQL<unknown>;
    }

    const donations = await db.query.donation.findMany({
      where: whereCondition,
      orderBy: desc(donation.createdAt),
      offset: (cursor - 1) * LIMIT_PER_PAGE,
      limit: LIMIT_PER_PAGE + 1,
      with: {
        campaign: true,
      },
    });

    let next = null;

    if (donations.length > 5) {
      next = cursor + 1;
    }

    return {
      donations: donations.slice(0, 5),
      next,
    };
  });
