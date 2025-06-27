import { Search } from "lucide-react";

export default function MobileSearchButton() {
  return (
    <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
      <Search className="w-6 h-6 text-gray-700" />
    </button>
  );
}
