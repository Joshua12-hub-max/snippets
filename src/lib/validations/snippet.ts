import { z } from "zod";

export const snippetSchema = z.object({
	title: z.string().min(1, "Title is required"),
	code: z.string().min(1, "Code is required"),
	language: z.string().min(1, "Language is required"),
});

export type SnippetFormValues = z.infer<typeof snippetSchema>;
