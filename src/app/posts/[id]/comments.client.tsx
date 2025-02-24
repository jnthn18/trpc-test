"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function Comments({ postId }: { postId: string }) {
  const trpc = useTRPC();
  const { data: comments, isLoading } = useQuery(
    trpc.comment.listByPost.queryOptions({ postId }),
  );

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (!comments) {
    return <p>Be the first to comment!</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.content}</p>
      ))}
    </div>
  );
}
