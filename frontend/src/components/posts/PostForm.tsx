"use client";

import { usePosts } from "@/contexts/PostContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  body: z.string().min(1, "Texto obrigatório"),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostForm() {
  const { create, creating } = usePosts();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostFormData) => {
    await create(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">Criar novo post</h2>
      <input
        type="text"
        placeholder="Título"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!!creating}
        {...register("title")}
      />

      {errors.title && (
        <span className="text-red-500 text-sm">{errors.title.message}</span>
      )}

      <textarea
        placeholder="Escreva seu post..."
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-y"
        disabled={!!creating}
        {...register("body")}
      />

      {errors.body && (
        <span className="text-red-500 text-sm">{errors.body.message}</span>
      )}

      <button
        type="submit"
        className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded font-bold disabled:opacity-60  ${
          creating ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={!!creating}
      >
        {creating ? "Publicando..." : "Publicar"}
      </button>
    </form>
  );
}
