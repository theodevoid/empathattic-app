import { createTRPCRouter } from "../../trpc";
import { getUser } from "./getUser";
import { updateUser } from "./updateUser";

export const userRouter = createTRPCRouter({
  getUser,
  updateUser,
});
