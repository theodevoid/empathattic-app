/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { eq } from "@empathattic/db/drizzle-orm";
import { campaign, donation } from "@empathattic/db/schemas";

import { x } from "../../lib/xendit";
import { protectedProcedure } from "../../trpc";

export const createDonation = protectedProcedure
  .input(
    z.object({
      campaignId: z.string().min(1),
      amount: z.number().min(10000, "minimum amount is 10.000"),
      platformFee: z.number().optional().default(0),
      isAnonymous: z.boolean().optional().default(false),
      message: z.string().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { campaignId, amount, platformFee, isAnonymous, message } = input;
    const { db, user } = ctx;

    const xenditInvoiceModule = new x.Invoice({});

    const campaignById = (
      await db.select().from(campaign).where(eq(campaign.id, campaignId))
    )[0];

    if (!campaignById) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "campaign not found",
      });
    }

    const now = new Date();

    if (campaignById.endDate <= now.toString()) {
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "campaign has ended",
      });
    }

    const donationTransactionResult = await db.transaction(async () => {
      const userDonation = (
        await db
          .insert(donation)
          .values({
            amount,
            campaignId,
            userId: user.id,
            isAnonymous,
            platformFee,
            message,
          })
          .returning()
      )[0];

      if (!userDonation) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "failed to create donation",
        });
      }

      const INVOICE_DURATION_IN_SECONDS = 3600;

      const campaignInvoice = await xenditInvoiceModule.createInvoice({
        amount: amount + platformFee,
        externalID: userDonation.id,
        payerEmail: user.email,
        customer: {
          email: user.email,
        },
        customerNotificationPreference: {
          invoice_created: ["email", "whatsapp"],
          invoice_reminder: ["email", "whatsapp"],
          invoice_paid: ["email", "whatsapp"],
          invoice_expired: ["email", "whatsapp"],
        },
        invoiceDuration: INVOICE_DURATION_IN_SECONDS,
        currency: "IDR",
        fees: [{ type: "platform", value: platformFee }],
        items: [
          {
            name: campaignById.title.slice(0, 256),
            quantity: 1,
            price: amount,
          },
        ],
      });

      const updatedDonation = (
        await db
          .update(donation)
          .set({
            externalId: (campaignInvoice as any).id as string,
            externalInvoiceUrl: (campaignInvoice as any).invoice_url as string,
          })
          .where(eq(donation.id, userDonation.id))
          .returning()
      )[0];

      return updatedDonation;
    });

    return donationTransactionResult;
  });
