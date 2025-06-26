"use client";

import { usePosts } from "@/contexts/PostContext";
import { useUser } from "@/contexts/UserContext";
import Post from "./Post";
import PostForm from "./PostForm";

export default function PostList() {
  const { user, loading: userLoading } = useUser();
  const { posts, removing, loading: postsLoading } = usePosts();

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
      <PostForm />
      <h1 className="text-3xl font-bold text-gray-900">Posts</h1>

      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          user={user}
          selfRemoving={removing === post.id}
        />
      ))}
    </div>
  );
}
