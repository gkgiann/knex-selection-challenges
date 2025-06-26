import PostList from "@/components/posts/PostList";
import UserProfile from "@/components/user/UserProfile";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bem-vindo ao Gianect
        </h1>
      </div>

      <div className="max-w-2xl mx-auto">
        <UserProfile />
        <PostList />
      </div>
    </div>
  );
}
