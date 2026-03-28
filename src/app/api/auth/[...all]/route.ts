import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);

// Force the route to be dynamic to prevent "Failed to collect page data" during build
export const dynamic = "force-dynamic";
