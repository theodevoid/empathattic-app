import { z } from "zod";

export const editProfileFormSchema = z.object({
  fullName: z.string().min(3),
});

export type EditProfileFormValues = z.infer<typeof editProfileFormSchema>;
