'use server';
/**
 * @fileOverview A flow to suggest relevant code snippets from the existing library when submitting new code.
 *
 * - suggestRelevantSnippets - A function that suggests relevant code snippets.
 * - SuggestRelevantSnippetsInput - The input type for the suggestRelevantSnippets function.
 * - SuggestRelevantSnippetsOutput - The return type for the suggestRelevantSnippets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantSnippetsInputSchema = z.object({
  title: z.string().describe('The title of the code snippet.'),
  description: z.string().describe('The description of the code snippet.'),
  codeContent: z.string().describe('The content of the code snippet.'),
});
export type SuggestRelevantSnippetsInput = z.infer<
  typeof SuggestRelevantSnippetsInputSchema
>;

const SuggestRelevantSnippetsOutputSchema = z.object({
  relevantSnippets: z
    .array(z.string())
    .describe('A list of relevant code snippets from the existing library.'),
});
export type SuggestRelevantSnippetsOutput = z.infer<
  typeof SuggestRelevantSnippetsOutputSchema
>;

export async function suggestRelevantSnippets(
  input: SuggestRelevantSnippetsInput
): Promise<SuggestRelevantSnippetsOutput> {
  return suggestRelevantSnippetsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantSnippetsPrompt',
  input: {schema: SuggestRelevantSnippetsInputSchema},
  output: {schema: SuggestRelevantSnippetsOutputSchema},
  prompt: `You are an expert code librarian. When given a code snippet and its description, you will respond with a list of relevant code snippets that a user might find in our library.

Title: {{{title}}}
Description: {{{description}}}
Code Content: {{{codeContent}}}`,
});

const suggestRelevantSnippetsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantSnippetsFlow',
    inputSchema: SuggestRelevantSnippetsInputSchema,
    outputSchema: SuggestRelevantSnippetsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
