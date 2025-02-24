import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { type } from "arktype";
import { comment } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const commentRouter = createTRPCRouter({
  create: publicProcedure
    .input(type({ postId: "string", content: "string" }).assert)
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
    .input(type({ postId: "string" }).assert)
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.comment.findMany({
        where: eq(comment.postId, input.postId),
      });
    }),
});
