import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { type } from "arktype";
import { post } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { format } from "date-fns";
import { desc } from "drizzle-orm";

export const postRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.post.findMany({
      orderBy: desc(post.createdAt),
    });
  }),
  getById: publicProcedure
    .input(type({ id: "string" }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.query.post.findFirst({
        where: (post, { eq }) => eq(post.id, input.id),
      });

      if (!post) return null;
      return { ...post, createdAt: format(post.createdAt, "MM/dd/yyyy") };
    }),
  create: publicProcedure
    .input(type({ title: "string >= 3", content: "string > 3" }))
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
