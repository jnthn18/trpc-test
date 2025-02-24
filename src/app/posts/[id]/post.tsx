import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RouterOutput } from "@/trpc/client";

type Post = NonNullable<RouterOutput["post"]["getById"]>;

export default function Post({ post }: { post: Post }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>Created at {post.createdAt}</CardDescription>
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
