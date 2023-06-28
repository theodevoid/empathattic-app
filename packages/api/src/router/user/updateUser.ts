import { z } from "zod";

import { eq } from "@empathattic/db/drizzle-orm";
import { user as userSchema } from "@empathattic/db/schemas";

import { protectedProcedure } from "../../trpc";

export const updateUser = protectedProcedure
  .input(
    z.object({
      fullName: z.string().min(3),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { user, db } = ctx;
    const { fullName } = input;

    const updatedUser = (
      await db
        .update(userSchema)
        .set({
          fullName,
        })
        .where(eq(userSchema.id, user.id))
        .returning()
    )[0];

    return updatedUser;
  });
