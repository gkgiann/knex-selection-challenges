"use client";

import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "@/services/postService";
import { Post } from "@/types/post";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface PostContextType {
  posts: Post[];
  loading: boolean;
  creating: boolean;
  updating: number | null;
  removing: number | null;
  fetchPosts: () => Promise<void>;
  create: (post: Omit<Post, "id">) => Promise<void>;
  update: (id: number, post: Partial<Omit<Post, "id">>) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePosts must be used within a PostProvider");
  return context;
}

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);
  const [removing, setRemoving] = useState<number | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await getPosts();
    setPosts(data);
    setLoading(false);
  };

  const create = async (post: Omit<Post, "id">) => {
    setCreating(true);
    const newPost = await createPost(post);
    setPosts((state) => [newPost, ...state]);
    setCreating(false);
  };

  const update = async (id: number, post: Partial<Omit<Post, "id">>) => {
    setUpdating(id);
    const updated = await updatePost(id, post);
    setPosts((state) => state.map((p) => (p.id === id ? updated : p)));
    setUpdating(null);
  };

  const remove = async (id: number) => {
    setRemoving(id);
    await deletePost(id);
    setPosts((state) => state.filter((p) => p.id !== id));
    setRemoving(null);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        creating,
        updating,
        removing,
        fetchPosts,
        create,
        update,
        remove,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
