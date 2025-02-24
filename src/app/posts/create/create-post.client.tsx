"use client";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type } from "arktype";

const postSchema = type({
  title: "string >= 3",
  content: "string > 3",
});

export default function CreatePostForm() {
  const router = useRouter();
  const trpc = useTRPC();

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onChange: postSchema,
    },
    onSubmit: async ({ value }) => {
      createPost(value);
    },
  });

  const createPostOptions = trpc.post.create.mutationOptions({
    onSuccess: (post) => {
      router.push(`/posts/${post.id}`);
    },
  });

  const { mutate: createPost, isPending } = useMutation(createPostOptions);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            New posts need to have a title and some content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form.Field name="title">
            {(field) => (
              <div className="grid w-full gap-1.5">
                <Label htmlFor="title" className="font-semibold">
                  Title
                </Label>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Title"
                />
                {field.state.meta.errors && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>
          <form.Field name="content">
            {(field) => (
              <div className="grid w-full gap-1.5">
                <Label htmlFor="content" className="font-semibold">
                  Content
                </Label>
                <Textarea
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Content"
                />
                {field.state.meta.errors && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
