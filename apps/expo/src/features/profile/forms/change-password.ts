import { z } from "zod";

export const changePasswordFormSchema = z.object({
  newPassword: z.string().min(8),
  oldPassword: z.string().min(8),
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;
