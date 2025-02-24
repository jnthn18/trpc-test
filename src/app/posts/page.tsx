import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HydrateClient, trpc, prefetch } from "@/trpc/server";
import PostList from "./post-list.client";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function PostsPage() {
  prefetch(trpc.post.list.queryOptions());

  return (
    <div className="min-h-screen text-center gap-8 p-8 flex flex-col max-w-80 mx-auto items-center">
      <h1 className="text-4xl font-bold">Posts</h1>
      <HydrateClient>
        <PostList />
      </HydrateClient>
      <Button size="lg" asChild>
        <Link href="/posts/create">Create Post</Link>
      </Button>
    </div>
  );
}
