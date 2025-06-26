import { Post } from "@/types/post";
import axios from "axios";

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return response.data;
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const response = await axios.post<Post>(
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
  return response.data;
};

export const updatePost = async (
  id: number,
  post: Partial<Omit<Post, "id">>
): Promise<Post> => {
  const response = await axios.put<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    post
  );
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
};
