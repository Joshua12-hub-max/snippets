import { getSnippets } from "@/lib/actions/snippets";
import { SnippetCard } from "@/components/snippet-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, FolderPlus } from "lucide-react";

export default async function DashboardPage() {
  const snippets = await getSnippets();

  return (
    <div className="container py-12 px-4 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h1 className="text-4xl text-white font-bold tracking-tight">Your Vault</h1>
          <p className="text-zinc-400">Manage and organize your secure snippets.</p>
        </div>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
          <Link href="/create" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Snippet
          </Link>
        </Button>
      </div>

      {snippets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6 border-2 border-dashed border-zinc-900 rounded-3xl bg-zinc-950/50">
          <div className="p-4 rounded-full bg-zinc-900/50">
            <FolderPlus className="w-12 h-12 text-zinc-700" />
          </div>
          <div className="space-y-1 text-center">
            <h3 className="text-xl font-semibold text-zinc-300">No snippets yet</h3>
            <p className="text-zinc-500 max-w-xs mx-auto">
              Start building your secure code collection today. All your snippets will be displayed here.
            </p>
          </div>
          <Button asChild variant="secondary" className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
            <Link href="/create">Create First Snippet</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
}
