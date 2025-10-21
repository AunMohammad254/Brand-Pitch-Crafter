'use server';

import { generateStartupName } from '@/ai/flows/generate-startup-name';
import { defineTargetAudience } from '@/ai/flows/define-target-audience';
import { createTaglines } from '@/ai/flows/create-taglines';
import { generateLandingPageCopy } from '@/ai/flows/generate-landing-page-copy';
import { suggestLogoDesigns } from '@/ai/flows/suggest-logo-designs';
import { z } from 'zod';

const FormSchema = z.object({
  niche: z.string().min(3, "Niche must be at least 3 characters."),
  problem: z.string().min(10, "Problem description must be at least 10 characters."),
  solution: z.string().min(10, "Solution description must be at least 10 characters."),
  mission: z.string().optional(),
  valueProposition: z.string().optional(),
});

export type BrandAssets = {
  startupName: string;
  taglines: string[];
  targetAudience: {
    demographics: string;
    psychographics: string;
    behavioralPatterns: string;
    marketingChannels: string;
  };
  landingPageCopy: {
    headline: string;
    bodyText: string;
    callToAction: string;
    keyFeatures: { name: string; description: string }[];
  };
  logoSuggestions: string[];
  problem: string;
  solution: string;
};


export async function generateBrandAssets(formData: FormData): Promise<BrandAssets> {
  const rawFormData = {
    niche: formData.get('niche'),
    problem: formData.get('problem'),
    solution: formData.get('solution'),
    mission: formData.get('mission'),
    valueProposition: formData.get('valueProposition'),
  };

  const validatedFields = FormSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    throw new Error("Invalid form data.");
  }
  const { niche, problem, solution, mission, valueProposition } = validatedFields.data;

  const idea = `Problem: ${problem}. Solution: ${solution}.`;
  
  const [nameResult, audienceResult] = await Promise.all([
      generateStartupName({ niche, idea }),
      defineTargetAudience({ niche, idea })
  ]);
  
  const startupName = nameResult.startupName;
  const targetAudience = audienceResult;
  
  const targetAudienceString = `Demographics: ${targetAudience.demographics}. Psychographics: ${targetAudience.psychographics}. Behavioral Patterns: ${targetAudience.behavioralPatterns}. Recommended marketing channels: ${targetAudience.marketingChannels}`;
      
  const brandIdentity = `Mission: ${mission || 'Not provided'}. Value Proposition: ${valueProposition || 'Not provided'}.`;

  const [taglinesResult, copyResult, logoResult] = await Promise.all([
      createTaglines({ startupName, mission: mission || '', valueProposition: valueProposition || '' }),
      generateLandingPageCopy({ 
          startupName, 
          niche, 
          idea, 
          targetAudience: targetAudienceString, 
          uniqueValueProposition: valueProposition || '' 
      }),
      suggestLogoDesigns({ 
          startupName, 
          brandIdentity, 
          targetAudience: targetAudienceString
      })
  ]);
  
  return {
      startupName,
      taglines: taglinesResult.taglines,
      targetAudience,
      landingPageCopy: copyResult,
      logoSuggestions: logoResult.logoSuggestions,
      problem,
      solution,
  };
}
