"use client";
import { useForm } from "@tanstack/react-form";

export default function CreatePostForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4 flex flex-col"
      >
        <form.Field name="title">
          {(field) => (
            <input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Title"
              className="text-background px-2 py-1 rounded-sm"
            />
          )}
        </form.Field>
        <form.Field name="content">
          {(field) => (
            <input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Content"
              className="text-background px-2 py-1 rounded-sm"
            />
          )}
        </form.Field>
        <button
          type="submit"
          className="rounded-lg border px-4 py-1 w-full hover:bg-foreground hover:text-background"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
