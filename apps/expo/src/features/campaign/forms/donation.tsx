import { z } from "zod";

export const donationFormSchema = z.object({
  amount: z.number().min(10000, "The minimum amount is Rp 10.000"),
});

export type DonationFormValues = z.infer<typeof donationFormSchema>;
