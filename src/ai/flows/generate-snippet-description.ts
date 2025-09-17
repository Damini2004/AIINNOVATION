'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a description for a code snippet.
 *
 * It includes:
 * - `generateSnippetDescription`: The main function to generate the description.
 * - `GenerateSnippetDescriptionInput`: The input type for the function.
 * - `GenerateSnippetDescriptionOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSnippetDescriptionInputSchema = z.object({
  code: z.string().describe('The code snippet to generate a description for.'),
  language: z.string().describe('The programming language of the code snippet.'),
});
export type GenerateSnippetDescriptionInput = z.infer<
  typeof GenerateSnippetDescriptionInputSchema
>;

const GenerateSnippetDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated description for the code snippet.'),
});
export type GenerateSnippetDescriptionOutput = z.infer<
  typeof GenerateSnippetDescriptionOutputSchema
>;

export async function generateSnippetDescription(
  input: GenerateSnippetDescriptionInput
): Promise<GenerateSnippetDescriptionOutput> {
  return generateSnippetDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSnippetDescriptionPrompt',
  input: {schema: GenerateSnippetDescriptionInputSchema},
  output: {schema: GenerateSnippetDescriptionOutputSchema},
  prompt: `You are an AI expert in generating concise and informative descriptions for code snippets.

  Given the following code snippet and its programming language, generate a description that accurately reflects the code's functionality and purpose.

  Language: {{{language}}}
  Code:
  \`\`\`{{{language}}}
  {{{code}}}
  \`\`\`

  Description:`, // Ensure output is just the description
});

const generateSnippetDescriptionFlow = ai.defineFlow(
  {
    name: 'generateSnippetDescriptionFlow',
    inputSchema: GenerateSnippetDescriptionInputSchema,
    outputSchema: GenerateSnippetDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
