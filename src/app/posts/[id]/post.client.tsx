"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import Link from "next/link";
import LoadingSkeleton from "@/components/ui/loading";
import { format } from "date-fns";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Post({ id }: { id: string }) {
  const trpc = useTRPC();
  const { data: post, isLoading } = useQuery(
    trpc.post.getById.queryOptions({ id }),
  );

  if (isLoading) <LoadingSkeleton />;

  if (!post)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Oops no post found!</CardTitle>
          <CardDescription>
            We couldn&apos;t find the post you&apos;re looking for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/posts">Back to posts</Link>
          </Button>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          Created at {format(post.createdAt, "MM/dd/yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>{post.content}</CardContent>
      <CardFooter className="justify-end">
        <Button asChild>
          <Link href="/posts">Back to posts</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
