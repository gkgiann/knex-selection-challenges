"use client";

import { usePosts } from "@/contexts/PostContext";
import { useUser } from "@/contexts/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Skeleton from "../layout/Skeleton";
import Post from "./Post";
import PostEdit from "./PostEdit";
import PostForm from "./PostForm";

export default function PostList() {
  const { user, loading: userLoading } = useUser();
  const { posts, removing, loading: postsLoading, updating } = usePosts();

  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  if (userLoading || postsLoading) {
    return <Skeleton />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6 mt-10">
      <PostForm />
      <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              scale: 0.6,
              rotate: 30,
              filter: "blur(2px)",
              y: -100,
              transition: { duration: 0.35, ease: "easeIn" },
            }}
            transition={{ duration: 0.3 }}
          >
            {editingPostId === post.id ? (
              <PostEdit
                post={post}
                user={user}
                selfUpdating={updating === post.id}
                onCancel={() => setEditingPostId(null)}
              />
            ) : (
              <Post
                post={post}
                user={user}
                selfRemoving={removing === post.id}
                onEdit={() => setEditingPostId(post.id)}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
