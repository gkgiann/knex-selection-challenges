"use client";

import { useUser } from "@/contexts/UserContext";
import { Bell, Home, MessageCircle, User } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const { user } = useUser();

  return (
    <nav className="flex items-center space-x-1">
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        title="Home"
      >
        <Home className="w-6 h-6 text-gray-700" />
      </button>
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors relative cursor-pointer"
        title="Mensagens"
      >
        <MessageCircle className="w-6 h-6 text-gray-700" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
          3
        </span>
      </button>
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors relative cursor-pointer"
        title="Notificações"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        <span className="absolute -top-0 -right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
      </button>

      {user ? (
        <div className="flex items-center space-x-2 ml-2">
          <Image
            src={user.avatar}
            alt={user.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full border-2 border-gray-300"
          />
        </div>
      ) : (
        <button
          className="p-2 rounded-full transition-colors cursor-pointer"
          title="Perfil"
        >
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        </button>
      )}
    </nav>
  );
}
