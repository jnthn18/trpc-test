import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { type } from "arktype";
import { post } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.post.findMany();
  }),
  getById: publicProcedure
    .input(type({ id: "string" }).assert)
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.query.post.findFirst({
        where: (post, { eq }) => eq(post.id, input.id),
      });

      if (!post) return null;
      return post;
    }),
  create: publicProcedure
    .input(type({ title: "string", content: "string" }).assert)
    .mutation(async ({ ctx, input }) => {
      const [newPost] = await ctx.db
        .insert(post)
        .values({ ...input })
        .returning();
      if (!newPost) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      return newPost;
    }),
});
