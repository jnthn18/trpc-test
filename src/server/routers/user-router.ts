import { publicProcedure, createTRPCRouter } from "@/server/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return { greeting: `hello ${input.text}` };
    }),
});
