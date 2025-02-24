import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { comment } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const commentRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ postId: z.string(), content: z.string() }))
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
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.comment.findMany({
        where: eq(comment.postId, input.postId),
      });
    }),
});
