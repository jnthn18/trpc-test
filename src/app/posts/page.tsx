import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function PostsPage() {
  const posts = await caller.post.list();

  return (
    <div className="min-h-screen text-center gap-8 p-8 flex flex-col max-w-80 mx-auto items-center">
      <h1 className="text-4xl font-bold">Posts</h1>
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="text-2xl font-semibold hover:underline"
        >
          {post.title}
        </Link>
      ))}
      <Link
        href="/posts/create"
        className="border rounded-lg py-3 px-4 text-lg font-bold hover:text-background hover:bg-foreground"
      >
        Create Post
      </Link>
    </div>
  );
}
