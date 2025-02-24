import { HydrateClient, trpc, prefetch, caller } from "@/trpc/server";
import Post from "./post";
import Comments from "./comments.client";
import { redirect } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await caller.post.getById({ id });
  prefetch(trpc.comment.listByPost.queryOptions({ postId: id }));

  if (!post) redirect("/posts");

  return (
    <div className="w-(--breakpoint-sm) mx-auto mt-8">
      <Post post={post} />
      <HydrateClient>
        <Comments postId={id} />
      </HydrateClient>
    </div>
  );
}
