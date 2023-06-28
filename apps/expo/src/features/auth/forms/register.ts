import { z } from "zod";

export const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
