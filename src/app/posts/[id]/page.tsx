import { HydrateClient, trpc, prefetch } from "@/trpc/server";
import Post from "./post.client";
import Comments from "./comments.client";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  prefetch(trpc.post.getById.queryOptions({ id }));
  prefetch(trpc.comment.listByPost.queryOptions({ postId: id }));

  return (
    <HydrateClient>
      <Post id={id} />
      <Comments postId={id} />
    </HydrateClient>
  );
}
