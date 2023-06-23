import { z } from "zod";

import { protectedProcedure } from "../../trpc";

export const createDonation = protectedProcedure
  .input(
    z.object({
      campaignId: z.string().min(1),
      amount: z.number().min(10000, "minimum amount is 10.000"),
    }),
  )
  .mutation(({ ctx, input }) => {
    const {} = input;
    const {} = ctx;
  });
