import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/sidbar";
import { Toaster } from "sonner";

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
          <Sidebar />
          {children}
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
