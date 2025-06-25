import { Github, Heart, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">G</span>
              </div>
              <span className="font-semibold text-gray-900">Gianect</span>
            </Link>
            <p className="text-sm text-gray-500 flex items-center">
              Feito com <Heart className="w-4 h-4 text-red-500 mx-1" /> para
              conectar pessoas
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm">
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sobre
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacidade
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Termos
            </Link>
            <Link
              href="/help"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Ajuda
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
              title="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-pink-500 transition-colors"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-400">
            © 2025 Gianect. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
