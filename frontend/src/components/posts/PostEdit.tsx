import { usePosts } from "@/contexts/PostContext";
import { Post, PostFormData, postSchema } from "@/types/post";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface PostEditProps {
  post: Post;
  user: User;
  selfUpdating: boolean;
  onCancel: () => void;
}

export default function PostEdit({
  post,
  user,
  selfUpdating,
  onCancel,
}: PostEditProps) {
  const { update } = usePosts();
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: post.title, body: post.body },
  });

  return (
    <form
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-4 relative"
      onSubmit={form.handleSubmit(async (data) => {
        await update(post.id, data);
        onCancel();
      })}
    >
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={user.avatar}
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full object-cover border border-gray-200"
        />
        <div>
          <div className="font-semibold text-gray-900 text-sm">{user.name}</div>
          <div className="text-xs text-gray-500">{user.location}</div>
        </div>
        <button
          type="button"
          className="ml-auto p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          title="Cancelar edição"
          onClick={onCancel}
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...form.register("title")}
        disabled={selfUpdating}
      />
      {form.formState.errors.title && (
        <span className="text-red-500 text-sm">
          {form.formState.errors.title.message}
        </span>
      )}
      <textarea
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-y"
        {...form.register("body")}
        disabled={selfUpdating}
      />
      {form.formState.errors.body && (
        <span className="text-red-500 text-sm">
          {form.formState.errors.body.message}
        </span>
      )}
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded font-bold cursor-pointer transition-colors hover:from-blue-600 hover:to-purple-700 disabled:opacity-60 disabled:cursor-wait"
          disabled={selfUpdating}
        >
          {selfUpdating ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded font-bold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={onCancel}
          disabled={selfUpdating}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
