import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, eq } from "@empathattic/db/drizzle-orm";
import { donation } from "@empathattic/db/schemas";

import { x } from "../../lib/xendit";
import { protectedProcedure } from "../../trpc";

export const getDonationById = protectedProcedure
  .input(
    z.object({
      donationId: z.string().min(1),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { db, user } = ctx;
    const { donationId } = input;

    let donationById = await db.query.donation.findFirst({
      where: and(eq(donation.id, donationId), eq(donation.userId, user.id)),
      with: {
        campaign: true,
      },
    });

    if (!donationById) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "donation not found",
      });
    }

    if (donationById.status === "AWAITING_PAYMENT") {
      const xenditInvoiceModule = new x.Invoice({});

      const donationInvoice: any = await xenditInvoiceModule.getInvoice({
        invoiceID: donationById.externalId as string,
      });

      let statusToUpdate: "AWAITING_PAYMENT" | "SUCCESS" | "FAIL" =
        "AWAITING_PAYMENT";

      if (
        donationInvoice.status === "PAID" ||
        donationInvoice.status === "SETTLED"
      ) {
        statusToUpdate = "SUCCESS";
      } else if (donationInvoice.status === "EXPIRED") {
        statusToUpdate = "FAIL";
      }

      await db
        .update(donation)
        .set({
          status: statusToUpdate,
        })
        .where(eq(donation.id, donationId));

      donationById = await db.query.donation.findFirst({
        where: and(eq(donation.id, donationId), eq(donation.userId, user.id)),
        with: {
          campaign: true,
        },
      });
    }

    return donationById;
  });
