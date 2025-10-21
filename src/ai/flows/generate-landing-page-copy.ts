'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating engaging landing page copy.
 *
 * The flow takes startup details as input and returns generated headlines, body text, and calls to action for a landing page.
 * @interface GenerateLandingPageCopyInput - Defines the input schema for the generateLandingPageCopy function.
 * @interface GenerateLandingPageCopyOutput - Defines the output schema for the generateLandingPageCopy function.
 * @function generateLandingPageCopy - The main function that calls the landing page copy generation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLandingPageCopyInputSchema = z.object({
  startupName: z.string().describe('The name of the startup.'),
  niche: z.string().describe('The niche or industry of the startup.'),
  idea: z.string().describe('A brief description of the startup idea.'),
  targetAudience: z.string().describe('The target audience for the startup.'),
  uniqueValueProposition: z.string().describe('The unique value proposition of the startup.'),
});
export type GenerateLandingPageCopyInput = z.infer<typeof GenerateLandingPageCopyInputSchema>;

const GenerateLandingPageCopyOutputSchema = z.object({
  headline: z.string().describe('A compelling headline for the landing page.'),
  bodyText: z.string().describe('Engaging body text describing the startup and its value proposition.'),
  callToAction: z.string().describe('A clear and concise call to action for the landing page.'),
});
export type GenerateLandingPageCopyOutput = z.infer<typeof GenerateLandingPageCopyOutputSchema>;

export async function generateLandingPageCopy(
  input: GenerateLandingPageCopyInput
): Promise<GenerateLandingPageCopyOutput> {
  return generateLandingPageCopyFlow(input);
}

const generateLandingPageCopyPrompt = ai.definePrompt({
  name: 'generateLandingPageCopyPrompt',
  input: {schema: GenerateLandingPageCopyInputSchema},
  output: {schema: GenerateLandingPageCopyOutputSchema},
  prompt: `You are a marketing expert specializing in creating high-converting landing page copy. Based on the information provided about the startup, generate a compelling headline, engaging body text, and a clear call to action.

Startup Name: {{{startupName}}}
Niche: {{{niche}}}
Idea: {{{idea}}}
Target Audience: {{{targetAudience}}}
Unique Value Proposition: {{{uniqueValueProposition}}}

Headline:
Body Text:
Call to Action:`,
});

const generateLandingPageCopyFlow = ai.defineFlow(
  {
    name: 'generateLandingPageCopyFlow',
    inputSchema: GenerateLandingPageCopyInputSchema,
    outputSchema: GenerateLandingPageCopyOutputSchema,
  },
  async input => {
    const {output} = await generateLandingPageCopyPrompt(input);
    return output!;
  }
);
