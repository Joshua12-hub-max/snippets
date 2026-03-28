"use server";

import { db } from "@/db";
import { snippets } from "@/db/schema";
import { auth } from "@/lib/auth";
import { snippetSchema, SnippetFormValues } from "@/lib/validations/snippet";
import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createSnippet(values: SnippetFormValues) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    const validatedFields = snippetSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error("Invalid fields");
    }

    const { title, code, language } = validatedFields.data;

    await db.insert(snippets).values({
        id: crypto.randomUUID(),
        title,
        code,
        language,
        userId: session.user.id,
    });

    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function getSnippets() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return [];
    }

    return await db
        .select()
        .from(snippets)
        .where(eq(snippets.userId, session.user.id))
        .orderBy(desc(snippets.createdAt));
}

export async function deleteSnippet(id: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    await db
        .delete(snippets)
        .where(
            and(
                eq(snippets.id, id),
                eq(snippets.userId, session.user.id)
            )
        );

    revalidatePath("/dashboard");
}
