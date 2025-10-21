'use server';

/**
 * @fileOverview A flow for generating startup names based on a niche and idea.
 *
 * - generateStartupName - A function that generates a startup name.
 * - GenerateStartupNameInput - The input type for the generateStartupName function.
 * - GenerateStartupNameOutput - The return type for the generateStartupName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStartupNameInputSchema = z.object({
  niche: z.string().describe('The niche of the startup.'),
  idea: z.string().describe('The idea behind the startup.'),
});
export type GenerateStartupNameInput = z.infer<typeof GenerateStartupNameInputSchema>;

const GenerateStartupNameOutputSchema = z.object({
  startupName: z.string().describe('The generated name of the startup.'),
});
export type GenerateStartupNameOutput = z.infer<typeof GenerateStartupNameOutputSchema>;

export async function generateStartupName(input: GenerateStartupNameInput): Promise<GenerateStartupNameOutput> {
  return generateStartupNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStartupNamePrompt',
  input: {schema: GenerateStartupNameInputSchema},
  output: {schema: GenerateStartupNameOutputSchema},
  prompt: `You are a creative naming consultant.

  Generate a startup name based on the following niche and idea:

  Niche: {{{niche}}}
  Idea: {{{idea}}}

  The startup name should be creative, relevant, and memorable.
  The name should be one or two words.
  `,
});

const generateStartupNameFlow = ai.defineFlow(
  {
    name: 'generateStartupNameFlow',
    inputSchema: GenerateStartupNameInputSchema,
    outputSchema: GenerateStartupNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
