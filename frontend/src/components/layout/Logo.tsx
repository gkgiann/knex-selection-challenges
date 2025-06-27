import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">G</span>
      </div>
      <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent hidden md:block">
        Gianect
      </span>
    </Link>
  );
}
