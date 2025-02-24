/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
import { makeQueryClient } from "./query-client";
import { appRouter } from "@/server/root";
import { createInnerContext } from "@/server/trpc";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { TRPCQueryOptions } from "@trpc/tanstack-react-query";

export const getQueryClient = cache(makeQueryClient);

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === "infinite") {
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
}

export const trpc = createTRPCOptionsProxy({
  ctx: createInnerContext,
  router: appRouter,
  queryClient: getQueryClient,
});
