import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { comment } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { type } from "arktype";

export const commentRouter = createTRPCRouter({
  create: publicProcedure
    .input(type({ postId: "string", content: "string >= 3" }))
    .mutation(async ({ ctx, input }) => {
      const [newComment] = await ctx.db
        .insert(comment)
        .values({ ...input })
        .returning();
      if (!newComment) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      return newComment;
    }),
  listByPost: publicProcedure
    .input(type({ postId: "string" }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.comment.findMany({
        where: eq(comment.postId, input.postId),
        orderBy: desc(comment.createdAt),
      });
    }),
});
