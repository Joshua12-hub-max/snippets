import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Shield, Zap, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
      <div className="max-w-4xl text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
            <Code2 className="w-12 h-12 text-indigo-500" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          Secure your snippets in a <span className="text-indigo-500">premium vault.</span>
        </h1>
        
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          The professional environment for managing your code. Multi-user support, 
          syntax highlighting, and strict data isolation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 h-12">
            <Link href="/dashboard">Access Vault</Link>
          </Button>
          <Button variant="outline" size="lg" className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 text-lg px-8 h-12">
            View Features
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 text-left">
            <Zap className="w-6 h-6 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">Lightning Fast</h3>
            <p className="text-sm text-zinc-400">Save and retrieve code in milliseconds with optimized server actions.</p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 text-left">
            <Shield className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Strict Isolation</h3>
            <p className="text-sm text-zinc-400">Your snippets are private, secured with enterprise-grade authentication.</p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 text-left">
            <Users className="w-6 h-6 text-sky-400" />
            <h3 className="text-lg font-semibold text-white">Multi-User</h3>
            <p className="text-sm text-zinc-400">Support for GitHub, Google, and Facebook social providers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
