'use server';

import { z } from 'zod';
import { generateSnippetDescription } from '@/ai/flows/generate-snippet-description';
import { suggestRelevantSnippets } from '@/ai/flows/intelligently-incorporate-snippets';

const snippetSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  code: z.string().min(1, "Code is required."),
  language: z.string(),
  tags: z.string(),
});

export async function generateDescriptionAction(code: string, language: string) {
  if (!code || !language) {
    return { error: 'Code and language are required.' };
  }
  try {
    const result = await generateSnippetDescription({ code, language });
    return { description: result.description };
  } catch (error) {
    console.error("Error generating description:", error);
    return { error: 'Failed to generate description.' };
  }
}

export async function submitSnippetAction(formData: {
    title: string;
    description: string;
    code: string;
    language: string;
    tags: string;
}) {
  const validatedFields = snippetSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields.",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description, code, language, tags } = validatedFields.data;

  // AI feature: Suggest relevant snippets
  try {
    const relevantSnippets = await suggestRelevantSnippets({
      title,
      description,
      codeContent: code,
    });
    console.log("AI Suggested Relevant Snippets:", relevantSnippets);
    // In a real app, you might display these suggestions to the user.
  } catch(e) {
    console.error("Could not get AI suggestions", e)
  }

  const newSnippet = {
    title,
    description,
    code,
    language,
    tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
  };
  
  // In a real application, you would save the newSnippet to a database.
  // For this demo, we'll just return it to the client to update the state.
  return { success: true, snippet: newSnippet };
}
