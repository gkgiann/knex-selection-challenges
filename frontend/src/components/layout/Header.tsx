"use client";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";
import MobileSearchButton from "./MobileSearchButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <SearchBar />
          <Navigation />
          <MobileSearchButton />
        </div>
      </div>
    </header>
  );
}
