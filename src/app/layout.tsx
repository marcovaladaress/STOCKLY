import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/sidbar";
import { Toaster } from "sonner";
import MobileNav from "./_components/mobile-nav";

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "STOCLY",
  description: "Sistema de controle de estoque",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-full w-full">
          {/* Sidebar desktop */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          
          {/* Conteúdo principal */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Mobile navigation */}
            <div className="lg:hidden">
              <MobileNav />
            </div>
            
            {/* Conteúdo da página */}
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
        <Toaster
          position="top-center"
          richColors
          theme="system"
          offset="80px"
          expand={false}
          closeButton
        />
      </body>
    </html>
  );
}
