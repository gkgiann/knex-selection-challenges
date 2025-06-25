import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { UserProvider } from "@/contexts/UserContext";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Gianect",
  description: "Uma rede social minimalista para conectar pessoas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} antialiased min-h-screen flex flex-col bg-gray-50`}
      >
        <UserProvider>
          <Header />
          <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
