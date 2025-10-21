'use server';

/**
 * @fileOverview Generates compelling taglines for a startup based on its mission and value proposition.
 *
 * - createTaglines - A function that generates taglines.
 * - CreateTaglinesInput - The input type for the createTaglines function.
 * - CreateTaglinesOutput - The return type for the createTaglines function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateTaglinesInputSchema = z.object({
  startupName: z.string().describe('The name of the startup.'),
  mission: z.string().describe('The mission of the startup.'),
  valueProposition: z.string().describe('The value proposition of the startup.'),
});
export type CreateTaglinesInput = z.infer<typeof CreateTaglinesInputSchema>;

const CreateTaglinesOutputSchema = z.object({
  taglines: z.array(z.string()).describe('An array of compelling taglines for the startup.'),
});
export type CreateTaglinesOutput = z.infer<typeof CreateTaglinesOutputSchema>;

export async function createTaglines(input: CreateTaglinesInput): Promise<CreateTaglinesOutput> {
  return createTaglinesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createTaglinesPrompt',
  input: {schema: CreateTaglinesInputSchema},
  output: {schema: CreateTaglinesOutputSchema},
  prompt: `You are a branding expert. Generate 5 compelling taglines for a startup with the following information:

Startup Name: {{{startupName}}}
Mission: {{{mission}}}
Value Proposition: {{{valueProposition}}}

Taglines:`, // No Handlebars in the list itself
});

const createTaglinesFlow = ai.defineFlow(
  {
    name: 'createTaglinesFlow',
    inputSchema: CreateTaglinesInputSchema,
    outputSchema: CreateTaglinesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
