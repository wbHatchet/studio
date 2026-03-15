'use server';
/**
 * @fileOverview An AI agent that analyzes YouTube trends and keyword data
 * to identify and SCORE profitable "Cash-Cow" micro-niches.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiNicheStrategyInputSchema = z.object({
  youtubeTrends: z.string().describe('A description of current YouTube trends.'),
  competitionAnalysis: z.string().describe('An analysis of the competitive landscape.'),
  keywordData: z.string().describe('Relevant keyword data and insights.'),
});

const AiNicheStrategyOutputSchema = z.object({
  suggestedMicroNiches: z.array(z.object({
    name: z.string(),
    score: z.number().describe('Niche potential score (0-100)'),
    trendVelocity: z.string().describe('How fast the trend is growing'),
    engagementPotential: z.enum(['Low', 'Medium', 'High', 'Extreme']),
    stackingPotential: z.string().describe('Ability to replicate across multiple channels'),
    competitionLevel: z.enum(['Low', 'Medium', 'High']),
  })),
  suggestedMonetization: z.object({
    adRevenueEst: z.string(),
    affiliateNiche: z.string(),
    brandDealPotential: z.string(),
  }),
  actionableInsights: z.string().describe('Strategic recommendations for channel network growth.'),
});

export async function aiNicheStrategy(input: z.infer<typeof AiNicheStrategyInputSchema>) {
  return aiNicheStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiNicheStrategyPrompt',
  input: {schema: AiNicheStrategyInputSchema},
  output: {schema: AiNicheStrategyOutputSchema},
  prompt: `You are an expert AI-driven Cash-Cow Discovery Engine. 
Analyze market data to identify underserved micro-niches suitable for a 10-channel network stack.

YouTube Trends: {{{youtubeTrends}}}
Competition Analysis: {{{competitionAnalysis}}}
Keyword Data: {{{keywordData}}}

Evaluate each niche for:
1. Trend Velocity (Growth speed)
2. Engagement Potential (Shock value)
3. Stacking Potential (Can we build 5-10 channels on this?)
4. Monetization Layers (Ads, Affiliates, Brand Deals)`
});

const aiNicheStrategyFlow = ai.defineFlow(
  {
    name: 'aiNicheStrategyFlow',
    inputSchema: AiNicheStrategyInputSchema,
    outputSchema: AiNicheStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
