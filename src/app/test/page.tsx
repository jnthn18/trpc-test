import { HydrateClient, trpc, prefetch } from "@/trpc/server";
import { ClientGreeting } from "./client-greeting";

export default async function TestPage() {
  prefetch(trpc.user.hello.queryOptions({ text: "Test" }));

  return (
    <HydrateClient>
      <ClientGreeting />
    </HydrateClient>
  );
}
