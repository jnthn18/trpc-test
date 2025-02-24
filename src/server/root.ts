import { postRouter } from "./routers/post-router";
import { commentRouter } from "./routers/comment-router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  comment: commentRouter,
});

export type AppRouter = typeof appRouter;
