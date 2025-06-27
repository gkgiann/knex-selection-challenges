import { usePosts } from "@/contexts/PostContext";
import type { Post } from "@/types/post";
import { User } from "@/types/user";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";

interface PostProps {
  post: Post;
  user: User;
  selfRemoving: boolean;
  onEdit: () => void;
}

export default function Post({ post, user, selfRemoving, onEdit }: PostProps) {
  const { remove } = usePosts();

  async function handleDelete() {
    await remove(post.id);
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-4 transition-opacity duration-300 ${
        selfRemoving
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
          <div className="font-semibold text-gray-900 text-sm">{user.name}</div>
          <div className="text-xs text-gray-500">{user.location}</div>
        </div>
        <button
          className="ml-auto p-2 rounded-full hover:bg-blue-50 transition-colors cursor-pointer mr-2"
          title="Editar post"
          onClick={onEdit}
          disabled={selfRemoving}
        >
          <Pencil className="w-5 h-5 text-blue-500" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
          title="Deletar post"
          onClick={handleDelete}
          disabled={selfRemoving}
        >
          <Trash className="w-5 h-5 text-red-500" />
        </button>
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">{post.title}</h3>
        <p className="text-gray-700 text-sm">{post.body}</p>
      </div>
    </div>
  );
}
