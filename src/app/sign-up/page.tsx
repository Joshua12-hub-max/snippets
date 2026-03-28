"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Mail, Facebook, Rocket } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function SignUpPage() {
  const [isPending, setIsPending] = useState<string | null>(null);

  const handleSocialSignIn = async (provider: "github" | "google" | "facebook") => {
    setIsPending(provider);
    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (error) {
      toast.error(`Failed to sign up with ${provider}`);
      setIsPending(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-500">
              <Rocket className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-white">Create an account</CardTitle>
          <CardDescription className="text-zinc-400">
            Join the elite vault for your snippets
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            disabled={!!isPending}
            onClick={() => handleSocialSignIn("github")}
            className="w-full bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            {isPending === "github" ? "Connecting..." : (
              <><Github className="mr-2 h-4 w-4" /> Sign up with GitHub</>
            )}
          </Button>
          <Button
            variant="outline"
            disabled={!!isPending}
            onClick={() => handleSocialSignIn("google")}
            className="w-full bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            {isPending === "google" ? "Connecting..." : (
              <><Mail className="mr-2 h-4 w-4" /> Sign up with Google</>
            )}
          </Button>
          <Button
            variant="outline"
            disabled={!!isPending}
            onClick={() => handleSocialSignIn("facebook")}
            className="w-full bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            {isPending === "facebook" ? "Connecting..." : (
              <><Facebook className="mr-2 h-4 w-4" /> Sign up with Facebook</>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-zinc-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-indigo-400 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
