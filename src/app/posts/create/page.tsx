import CreatePostForm from "./create-post.client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CreatePostPage() {
  return (
    <div className="w-(--breakpoint-sm) mx-auto">
      <Button className="my-8" asChild>
        <Link href="/posts">Back to posts</Link>
      </Button>
      <CreatePostForm />
    </div>
  );
}
