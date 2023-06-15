import { user } from "@empathattic/db/schemas";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx;

    const users = await db.select().from(user);

    return users;
  }),
});
