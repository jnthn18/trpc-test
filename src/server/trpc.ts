import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { db } from "./db";
import { ArkError } from "arktype";

interface CreateInnerContextOptions
  extends Partial<FetchCreateContextFnOptions> {
  userId: string | null;
}

export const createInnerContext = async (opts?: CreateInnerContextOptions) => {
  return {
    db,
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
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        arkError:
          error.cause instanceof AggregateError
            ? error.cause.errors.map((error: ArkError) => {
                return { path: error.path[0], message: error.message };
              })
            : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
