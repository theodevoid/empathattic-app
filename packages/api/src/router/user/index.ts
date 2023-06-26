import { createTRPCRouter } from "../../trpc";
import { getUser } from "./getUser";

export const userRouter = createTRPCRouter({
  getUser,
});
