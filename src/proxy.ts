import { auth } from "@/lib/auth";
import { NextRequest, NextResponse, type NextFetchEvent } from "next/server";

export async function proxy(request: NextRequest, event: NextFetchEvent) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session && (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/create"))) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export default proxy;

export const config = {
    matcher: ["/", "/dashboard/:path*", "/create/:path*"],
};
