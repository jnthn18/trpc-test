import { HydrateClient, trpc, prefetch } from "@/trpc/server";
import Post from "./post.client";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  prefetch(trpc.post.getById.queryOptions({ id }));

  return (
    <HydrateClient>
      <Post id={id} />
    </HydrateClient>
  );
}
