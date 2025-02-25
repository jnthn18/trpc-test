"use client";

import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { type } from "arktype";

const commentSchema = type({
  postId: "string",
  content: "string >= 3",
});

export default function AddComment({ postId }: { postId: string }) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const mutationOptions = trpc.comment.create.mutationOptions({
    onSuccess: () => {
      const queryKey = trpc.comment.listByPost.queryKey();
      queryClient.invalidateQueries({ queryKey });
    },
  });
  const { mutate: addComment, isPending } = useMutation(mutationOptions);

  const form = useForm({
    defaultValues: {
      postId,
      content: "",
    },
    validators: {
      onSubmit: commentSchema,
    },
    onSubmit: async ({ value }) => {
      addComment(value);
      form.reset();
    },
  });

  return (
    <div className="flex flex-col my-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
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
        <Button size="sm" type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </div>
  );
}
