import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function PostsPage() {
  const posts = await caller.post.list();

  return (
    <div className="min-h-screen text-center gap-8 p-8 flex flex-col max-w-80 mx-auto items-center">
      <h1 className="text-4xl font-bold">Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded-lg w-full shadow-sm">
          <Link
            href={`/posts/${post.id}`}
            className="text-2xl font-semibold hover:underline"
          >
            {post.title}
          </Link>
        </div>
      ))}
      <Button size="lg" asChild>
        <Link href="/posts/create">Create Post</Link>
      </Button>
    </div>
  );
}
