'use server';

/**
 * @fileOverview Generates logo design suggestions based on the startup's brand identity and target audience.
 *
 * - suggestLogoDesigns - A function that generates logo design suggestions.
 * - SuggestLogoDesignsInput - The input type for the suggestLogoDesigns function.
 * - SuggestLogoDesignsOutput - The return type for the suggestLogoDesigns function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLogoDesignsInputSchema = z.object({
  brandIdentity: z
    .string()
    .describe('The brand identity of the startup, including its values and mission.'),
  targetAudience: z
    .string()
    .describe('A description of the startup\'s target audience.'),
  startupName: z.string().describe('The name of the startup.'),
});
export type SuggestLogoDesignsInput = z.infer<typeof SuggestLogoDesignsInputSchema>;

const SuggestLogoDesignsOutputSchema = z.object({
  logoSuggestions: z
    .array(z.string())
    .describe('An array of logo design suggestions.'),
});
export type SuggestLogoDesignsOutput = z.infer<typeof SuggestLogoDesignsOutputSchema>;

export async function suggestLogoDesigns(
  input: SuggestLogoDesignsInput
): Promise<SuggestLogoDesignsOutput> {
  return suggestLogoDesignsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLogoDesignsPrompt',
  input: {schema: SuggestLogoDesignsInputSchema},
  output: {schema: SuggestLogoDesignsOutputSchema},
  prompt: `You are a logo design expert. Based on the startup's brand identity, target audience, and startup name, provide logo design suggestions.

Brand Identity: {{{brandIdentity}}}
Target Audience: {{{targetAudience}}}
Startup Name: {{{startupName}}}

Consider the following aspects when providing suggestions:
- Color schemes that align with the brand identity.
- Iconography that resonates with the target audience.
- Font styles that reflect the brand's personality.
- Overall aesthetic and style (e.g., modern, minimalist, vintage, etc.).

Return an array of logo design suggestions. Each suggestion should be a detailed description of a logo design.

Output in JSON format:
`,
});

const suggestLogoDesignsFlow = ai.defineFlow(
  {
    name: 'suggestLogoDesignsFlow',
    inputSchema: SuggestLogoDesignsInputSchema,
    outputSchema: SuggestLogoDesignsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
