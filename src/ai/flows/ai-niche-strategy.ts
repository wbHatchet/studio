'use server';
/**
 * @fileOverview An AI agent that analyzes YouTube trends and identifies profitable "Cash-Cow" micro-niches.
 * Optimized for the 2026 "100-Channel Grid" strategy and Serialized Viral Formula.
 * Updated to prioritize the 7 niches that hit 1M subscribers fastest.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiNicheStrategyInputSchema = z.object({
  youtubeTrends: z.string().describe('A description of current YouTube trends.'),
  competitionAnalysis: z.string().describe('An analysis of the competitive landscape.'),
  keywordData: z.string().describe('Relevant keyword data and insights.'),
  includeFastestTo1M: z.boolean().default(true).describe('Whether to force include the top 7 growth formats that hit 1M subs fast.'),
});

const AiNicheStrategyOutputSchema = z.object({
  suggestedMicroNiches: z.array(z.object({
    name: z.string(),
    score: z.number().describe('Niche potential score (0-100)'),
    trendVelocity: z.string().describe('How fast the trend is growing'),
    engagementPotential: z.enum(['Low', 'Medium', 'High', 'Extreme']),
    stackingPotential: z.string().describe('Ability to replicate across multiple channels'),
    competitionLevel: z.enum(['Low', 'Medium', 'High']),
    cpmEstimate: z.string().describe('Estimated CPM for this niche.'),
    growthFormat: z.string().describe('Format (e.g., AI Job Replacement, Body Facts, Psychology)'),
  })),
  serializedSeriesIdeas: z.array(z.object({
    seriesTitle: z.string().describe('Title for a serialized content series (e.g. AI vs Excel #1-20).'),
    concept: z.string(),
    targetAudience: z.string(),
    viralMultiplier: z.string().describe('How to clone this if it hits 1M views.'),
  })),
  suggestedMonetization: z.object({
    adRevenueEst: z.string(),
    affiliateNiche: z.string(),
    brandDealPotential: z.string(),
  }),
  actionableInsights: z.string().describe('Strategic recommendations for channel grid growth and 30s viral structure optimization.'),
});

export async function aiNicheStrategy(input: z.infer<typeof AiNicheStrategyInputSchema>) {
  return aiNicheStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiNicheStrategyPrompt',
  input: {schema: AiNicheStrategyInputSchema},
  output: {schema: AiNicheStrategyOutputSchema},
  prompt: `You are an expert AI-driven Cash-Cow Discovery Engine. 
Analyze market data to identify underserved micro-niches suitable for a 100-channel network stack.

YouTube Trends: {{{youtubeTrends}}}
Competition Analysis: {{{competitionAnalysis}}}
Keyword Data: {{{keywordData}}}

{{#if includeFastestTo1M}}
PRIORITIZE EVALUATION OF THESE 7 FORMATS THAT HIT 1M SUBS FASTEST:
1. AI Job Replacement (Tools that replace Excel, websites, etc.) - High CPM.
2. "What Happens If..." Body Facts (Biology curiosity hooks).
3. Billionaire & Luxury Lifestyle (Jeff Bezos/Musk routines, Status curiosity).
4. Crazy History Stories (Short storytelling, Reddit/Wikipedia mining).
5. Dark Psychology Tricks (Mind hacks, negotiator secrets) - Extreme retention.
6. Satisfying Factory Processes (Visual dopamine, candy/cookie factories).
7. "Top 3" Micro-Learning (List formats, Books/Habits) - Simple scaling.
{{/if}}

STRICT VIRAL FORMULA (30s):
- 0–2s: Curiosity Hook
- 2–12s: Explanation
- 12–25s: Reveal
- 25–30s: Loop Hook

Identify "Viral Multiplication" triggers: If a video hits 500K views, suggest how to generate 10 similar clones.

Evaluate each niche for:
1. Trend Velocity (Growth speed)
2. Stacking Potential (Can we build 10-20 channels on this?)
3. Monetization Layers (Ads, Affiliates, Brand Deals)`
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
