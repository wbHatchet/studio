'use server';
/**
 * @fileOverview An AI agent that analyzes YouTube trends and identifies profitable "Cash-Cow" micro-niches.
 * Optimized for the 2026 "7-Channel Stack" strategy and Serialized Content formula.
 * Updated to prioritize the 3 formats that reach 1M subscribers fastest.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiNicheStrategyInputSchema = z.object({
  youtubeTrends: z.string().describe('A description of current YouTube trends.'),
  competitionAnalysis: z.string().describe('An analysis of the competitive landscape.'),
  keywordData: z.string().describe('Relevant keyword data and insights.'),
  includeFastestTo1M: z.boolean().default(true).describe('Whether to force include the top 3 growth formats that hit 1M subs fast.'),
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
    growthFormat: z.string().describe('Format (e.g., Knowledge Engine, Story Series, Visual Satisfaction)'),
  })),
  serializedSeriesIdeas: z.array(z.object({
    seriesTitle: z.string().describe('Title for a serialized content series (e.g. Rich Habits #1-20).'),
    concept: z.string(),
    targetAudience: z.string(),
    viralMultiplier: z.string().describe('How to clone this if it hits 1M views.'),
  })),
  suggestedMonetization: z.object({
    adRevenueEst: z.string(),
    affiliateNiche: z.string(),
    brandDealPotential: z.string(),
  }),
  actionableInsights: z.string().describe('Strategic recommendations for channel network growth and serialized compounding.'),
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

{{#if includeFastestTo1M}}
PRIORITIZE EVALUATION OF THESE 3 FORMATS THAT HIT 1M SUBS FASTEST:
1. "Did You Know?" Knowledge Engine (Rapid-fire facts, high curiosity, 30-40s).
2. Story Series Channels (Serialized storytelling, Reddits/Wiki mining, high binge-watch potential).
3. "Visual Satisfaction" Channels (Visual dopamine, factory processes, food builds, language-agnostic).
{{/if}}

STRICT INSTRUCTION: Focus on "Serialized Content" (Series formats like #1-20) as it compounds views 400x faster than one-offs.

Identify "Viral Multiplication" triggers: If a video hits 1M views, suggest how to generate 10 similar clones.

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
