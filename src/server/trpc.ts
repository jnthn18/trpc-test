import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

interface CreateInnerContextOptions
  extends Partial<FetchCreateContextFnOptions> {
  userId: string | null;
}

export const createInnerContext = async (opts?: CreateInnerContextOptions) => {
  return {
    ...opts,
  };
};

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const innerContext = await createInnerContext();

  return {
    ...innerContext,
    ...opts,
  };
};

type Context = Awaited<ReturnType<typeof createInnerContext>>;

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
