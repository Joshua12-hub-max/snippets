"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Mail, Facebook, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SignInPage() {
  const [isPending, setIsPending] = useState<string | null>(null);

  const handleSocialSignIn = async (provider: "github" | "google" | "facebook") => {
    setIsPending(provider);
    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (error) {
      toast.error(`Failed to sign in with ${provider}`);
      setIsPending(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-white">Welcome back</CardTitle>
          <CardDescription className="text-zinc-400">
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            disabled={!!isPending}
            onClick={() => handleSocialSignIn("github")}
            className="w-full bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            {isPending === "github" ? (
              <span className="animate-spin mr-2">...</span>
            ) : (
              <Github className="mr-2 h-4 w-4" />
            )}
            Continue with GitHub
          </Button>
          <Button
            variant="outline"
            disabled={!!isPending}
            onClick={() => handleSocialSignIn("google")}
            className="w-full bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            {isPending === "google" ? (
              <span className="animate-spin mr-2">...</span>
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Continue with Google
          </Button>
          <Button
            variant="outline"
            disabled={!!isPending}
            onClick={() => handleSocialSignIn("facebook")}
            className="w-full bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            {isPending === "facebook" ? (
              <span className="animate-spin mr-2">...</span>
            ) : (
              <Facebook className="mr-2 h-4 w-4" />
            )}
            Continue with Facebook
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="px-8 text-center text-sm text-zinc-500">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-indigo-400">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-indigo-400">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
