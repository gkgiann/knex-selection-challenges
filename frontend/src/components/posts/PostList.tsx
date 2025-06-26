"use client";

import { usePosts } from "@/contexts/PostContext";
import { useUser } from "@/contexts/UserContext";
import { Trash } from "lucide-react";
import Image from "next/image";

export default function PostList() {
  const { user, loading: userLoading } = useUser();
  const { posts, remove, removing, loading: postsLoading } = usePosts();

  const handleDelete = async (id: number) => {
    await remove(id);
  };

  if (userLoading || postsLoading) {
    return (
      <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-3 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6 mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Posts</h1>

        <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded font-bold cursor-pointer">
          Criar Post
        </button>
      </div>

      {posts.map((post) => (
        <div
          key={post.id}
          className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-4 transition-opacity duration-300 ${
            removing === post.id
              ? "opacity-50 blur-[2px] pointer-events-none "
              : "opacity-100"
          }`}
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
              <div className="font-semibold text-gray-900 text-sm">
                {user.name}
              </div>
              <div className="text-xs text-gray-500">{user.location}</div>
            </div>
            <button
              className="ml-auto p-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
              title="Deletar post"
              onClick={() => handleDelete(post.id)}
              disabled={removing === post.id}
            >
              <Trash className="w-5 h-5 text-red-500" />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {post.title}
            </h3>
            <p className="text-gray-700 text-sm">{post.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
