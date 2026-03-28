"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { snippetSchema, SnippetFormValues } from "@/lib/validations/snippet";
import { createSnippet } from "@/lib/actions/snippets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const LANGUAGES = [
  "javascript", "typescript", "python", "go", "rust", "cpp", "java", "html", "css", "sql"
];

export default function CreateSnippetPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<SnippetFormValues>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title: "",
      code: "",
      language: "javascript",
    },
  });

  const onSubmit = async (values: SnippetFormValues) => {
    setIsPending(true);
    try {
      await createSnippet(values);
      toast.success("Snippet created successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to create snippet");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Create New Snippet</CardTitle>
          <CardDescription className="text-zinc-500">
            Share your code with the world (or just save it for later).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Title</label>
              <Input
                {...form.register("title")}
                placeholder="My Awesome Snippet"
                className="bg-zinc-950 border-zinc-800 text-white focus:ring-indigo-500"
              />
              {form.formState.errors.title && (
                <p className="text-xs text-red-500">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Language</label>
              <select
                {...form.register("language")}
                className="w-full h-9 rounded-md bg-zinc-950 border border-zinc-800 text-white text-sm px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Code</label>
              <Textarea
                {...form.register("code")}
                placeholder="paste your code here..."
                className="min-h-[300px] bg-zinc-950 border-zinc-800 text-white font-mono focus:ring-indigo-500"
              />
              {form.formState.errors.code && (
                <p className="text-xs text-red-500">{form.formState.errors.code.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                className="text-zinc-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Snippet"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
