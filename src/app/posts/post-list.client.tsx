"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "@/components/ui/loading";
import Link from "next/link";

export default function PostList() {
  const trpc = useTRPC();
  const { data: posts, isLoading } = useQuery(trpc.post.list.queryOptions());

  if (isLoading || !posts) {
    return <LoadingSkeleton />;
  }

  return (
    <ul className="flex flex-col w-80">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            className="text-sm font-bold hover:underline"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
