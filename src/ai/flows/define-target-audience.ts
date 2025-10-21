'use server';

/**
 * @fileOverview Defines the ideal target audience for a startup with an analysis of potential customers.
 *
 * - defineTargetAudience - A function that defines the target audience.
 * - DefineTargetAudienceInput - The input type for the defineTargetAudience function.
 * - DefineTargetAudienceOutput - The return type for the defineTargetAudience function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DefineTargetAudienceInputSchema = z.object({
  niche: z.string().describe('The specific niche of the startup.'),
  idea: z.string().describe('A detailed description of the startup idea.'),
});
export type DefineTargetAudienceInput = z.infer<typeof DefineTargetAudienceInputSchema>;

const DefineTargetAudienceOutputSchema = z.object({
  demographics: z.string().describe('The demographics of the target audience, including age, gender, location, and income.'),
  psychographics: z.string().describe('The psychographics of the target audience, including their values, interests, and lifestyle.'),
  behavioralPatterns: z.string().describe('The behavioral patterns of the target audience, including their purchasing habits and online behavior.'),
  marketingChannels: z.string().describe('Recommended marketing channels to reach the target audience effectively.'),
});
export type DefineTargetAudienceOutput = z.infer<typeof DefineTargetAudienceOutputSchema>;

export async function defineTargetAudience(input: DefineTargetAudienceInput): Promise<DefineTargetAudienceOutput> {
  return defineTargetAudienceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'defineTargetAudiencePrompt',
  input: {schema: DefineTargetAudienceInputSchema},
  output: {schema: DefineTargetAudienceOutputSchema},
  prompt: `You are an expert marketing consultant specializing in defining target audiences for startups.

  Based on the startup's niche and idea, you will analyze potential customers and provide a detailed description of the ideal target audience.

  Niche: {{{niche}}}
  Idea: {{{idea}}}

  Consider the following aspects when defining the target audience:
  - Demographics: Age, gender, location, income, education, etc.
  - Psychographics: Values, interests, lifestyle, attitudes, etc.
  - Behavioral Patterns: Purchasing habits, online behavior, media consumption, etc.
  - Marketing Channels: Social media platforms, online advertising, content marketing, email marketing, etc.

  Provide a comprehensive analysis of the target audience, including demographics, psychographics, behavioral patterns, and recommended marketing channels.
  `,
});

const defineTargetAudienceFlow = ai.defineFlow(
  {
    name: 'defineTargetAudienceFlow',
    inputSchema: DefineTargetAudienceInputSchema,
    outputSchema: DefineTargetAudienceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
