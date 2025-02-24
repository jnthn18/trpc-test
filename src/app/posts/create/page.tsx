import CreatePostForm from "./create-post.client";

export default async function CreatePostPage() {
  return (
    <div className="mt-8 flex justify-center flex-col w-96 items-center mx-auto">
      <h1 className="text-4xl font-bold mb-4">Create Post</h1>
      <CreatePostForm />
    </div>
  );
}
