"use client";

import { useTransition } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Copy, Check, Clock } from "lucide-react";
import { deleteSnippet } from "@/lib/actions/snippets";
import { toast } from "sonner";
import { useState } from "react";
import { CodeBlock } from "./code-block";
import { formatDistanceToNow } from "date-fns";

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  createdAt: Date;
}

export function SnippetCard({ snippet }: { snippet: Snippet }) {
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this snippet?")) {
      startTransition(async () => {
        try {
          await deleteSnippet(snippet.id);
          toast.success("Snippet deleted successfully!");
        } catch (error) {
          toast.error("Failed to delete snippet.");
        }
      });
    }
  };

  return (
    <Card className="flex flex-col bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all shadow-lg group">
      <CardHeader className="p-4 space-y-2 pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 capitalize">
            {snippet.language}
          </Badge>
          <div className="flex items-center gap-1 text-[10px] text-zinc-500">
            <Clock className="w-3 h-3" />
            {formatDistanceToNow(snippet.createdAt)} ago
          </div>
        </div>
        <CardTitle className="text-lg font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
          {snippet.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1 flex-1 overflow-hidden">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden max-h-[200px] relative">
          <CodeBlock code={snippet.code} language={snippet.language} />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-zinc-500 hover:text-white hover:bg-zinc-800 flex-1 gap-2"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          onClick={handleDelete}
          className="h-9 w-9 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
