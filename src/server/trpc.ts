import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  return {
    ...opts,
  };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
