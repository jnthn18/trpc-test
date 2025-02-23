import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { ClientGreeting } from "./client-greeting";

export default async function TestPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.user.hello.queryOptions({ text: "Test" }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientGreeting />
    </HydrationBoundary>
  );
}
