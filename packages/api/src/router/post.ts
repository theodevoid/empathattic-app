import { user } from "@empathattic/db/schemas";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx;

    const users = await db.select().from(user);

    return users;
  }),
});
