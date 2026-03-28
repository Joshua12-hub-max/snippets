import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnippetVault | Secure Developer Snippet Management",
  description: "A professional code snippet vault.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-zinc-950 text-zinc-50`}>
        <NavbarWrapper />
        <main className="flex-1">
          {children}
        </main>
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}
