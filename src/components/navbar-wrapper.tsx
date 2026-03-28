"use client";

import dynamic from "next/dynamic";

const DynamicNavbar = dynamic(() => import("./navbar").then((mod) => mod.Navbar), {
  ssr: false,
  loading: () => (
    <nav className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl animate-pulse" />
  ),
});

export function NavbarWrapper() {
  return <DynamicNavbar />;
}
