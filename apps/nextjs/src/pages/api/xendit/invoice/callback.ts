import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@empathattic/db";
import { eq, sql } from "@empathattic/db/drizzle-orm";
import {
  campaign as campaignSchema,
  donation as donationSchema,
} from "@empathattic/db/schemas";

import { env } from "~/env.mjs";

type XenditBody = {
  id: string;
  external_id: string;
  status: "PAID" | "EXPIRED";
  amount: number;
  updated: string;
  created: string;
  paid_at: string;
  payment_method: string;
  payment_channel: string;
  bank_code?: string;
};

interface Request extends NextApiRequest {
  body: XenditBody;
}

export default async function handler(req: Request, res: NextApiResponse) {
  if (
    req.method === "POST" &&
    req.headers["x-callback-token"] === env.XENDIT_CALLBACK_KEY
  ) {
    const { body } = req;

    const { external_id: donationId, status, paid_at, amount } = body;

    const donation = (
      await db
        .select()
        .from(donationSchema)
        .where(eq(donationSchema.id, donationId))
    )[0];

    if (!donation) {
      res.status(200).send("donation not found");
      return;
    }

    if (status === "PAID") {
      await db
        .update(donationSchema)
        .set({
          paidAt: new Date(Date.parse(paid_at)),
          status: "SUCCESS",
        })
        .where(eq(donationSchema.id, donationId));

      await db
        .update(campaignSchema)
        .set({
          currentFunding: sql`${campaignSchema.currentFunding} + ${amount}`,
          totalFunding: sql`${campaignSchema.totalFunding} + ${amount}`,
        })
        .where(eq(campaignSchema.id, donation.campaignId));
    } else if (status === "EXPIRED") {
      await db
        .update(donationSchema)
        .set({
          status: "FAIL",
        })
        .where(eq(donationSchema.id, donationId));
    }

    res.status(200).send("OK");
  }
}
