import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import SuperJSON from "superjson";

interface CreateInnerContextOptions
  extends Partial<FetchCreateContextFnOptions> {
  userId: string | null;
}

// Inner context. Will always be available in your procedures
// Useful for:
// - testing, so you don't have to mock Next.js
export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    userId: opts?.userId ?? null,
  };
}

// Outer context. Used in the routers and will add req & res to options
export async function createTRPCContext(opts: FetchCreateContextFnOptions) {
  const contextInner = await createContextInner({ userId: "123" });

  return {
    ...contextInner,
    headers: opts && Object.fromEntries(opts.req.headers),
  };
}

//export const createTRPCContext = async (opts: CreateNextContextOptions) => {
//  return {
//    userId: "123",
//    ...opts,
//  };
//};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
