import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function PostsPage() {
  const posts = await caller.post.list();

  return (
    <div className="min-h-screen text-center space-y-4 p-8">
      <h1 className="text-4xl font-bold">Posts Page</h1>
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="text-lg font-semibold"
        >
          {post.title}
        </Link>
      ))}
    </div>
  );
}
