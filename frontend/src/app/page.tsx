import PostList from "@/components/posts/PostList";
import UserProfile from "@/components/user/UserProfile";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-medium  mb-4">
          Bem-vindo ao{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent font-bold">
            Gianect
          </span>
        </h1>
      </div>

      <div className="max-w-2xl mx-auto">
        <UserProfile />
        <PostList />
      </div>
    </div>
  );
}
