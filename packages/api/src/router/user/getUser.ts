import { TRPCError } from "@trpc/server";

import { eq } from "@empathattic/db/drizzle-orm";
import { user as userSchema } from "@empathattic/db/schemas";

import { protectedProcedure } from "../../trpc";

export const getUser = protectedProcedure.query(async ({ ctx }) => {
  const { user, db } = ctx;

  const userById = await db.query.user.findFirst({
    where: eq(userSchema.id, user.id),
  });

  if (!userById) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "user not found",
    });
  }

  return userById;
});
