"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import Link from "next/link";

export default function Post({ id }: { id: string }) {
  const trpc = useTRPC();
  const { data: post, isLoading } = useQuery(
    trpc.post.getById.queryOptions({ id }),
  );

  if (isLoading)
    return (
      <div className="p-4 mx-auto w-80 rounded-md border mt-8">Loading...</div>
    );

  if (!post)
    return (
      <div className="p-4 mx-auto w-80 rounded-md border mt-8">
        <Link href="/posts" className="hover:underline">
          Back to posts
        </Link>
        <p>Oops! No post found.</p>
      </div>
    );

  return (
    <div className="p-4 mx-auto w-80 rounded-md border mt-8">
      <Link href="/posts" className="hover:underline">
        Back to posts
      </Link>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-lg">{post.content}</p>
    </div>
  );
}
