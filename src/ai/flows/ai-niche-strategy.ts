'use server';
/**
 * @fileOverview An AI agent that analyzes YouTube trends and identifies profitable "Cash-Cow" micro-niches.
 * Optimized for the 2026 "100-Channel Grid" strategy and Serialized Viral Formula.
 * Refined with "Profit-First" validation logic (R&B, Pop, Boom Bap focus).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiNicheStrategyInputSchema = z.object({
  youtubeTrends: z.string().describe('A description of current YouTube trends.'),
  competitionAnalysis: z.string().describe('An analysis of the competitive landscape.'),
  keywordData: z.string().describe('Relevant keyword data and insights.'),
  includeFastestTo1M: z.boolean().default(true).describe('Whether to force include the top growth formats.'),
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
    profitFilterPassed: z.boolean().describe('Whether this niche matches high-conversion criteria (R&B, Pop, Boom Bap).')
  })),
  serializedSeriesIdeas: z.array(z.object({
    seriesTitle: z.string().describe('Title for a serialized content series.'),
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
  prompt: `You are a Market-Driven Sales Engine Director. 
Analyze market data to identify underserved micro-niches suitable for a 100-channel network stack.

YouTube Trends: {{{youtubeTrends}}}
Competition Analysis: {{{competitionAnalysis}}}
Keyword Data: {{{keywordData}}}

STRICT PROFIT FILTER:
Prioritize niches that fall into these "High-Ticket" categories:
1. R&B (Late night vibes, 2012 vintage Drake) - High Licensing Value.
2. Pop (Upbeat, global appeal) - High Sync Revenue.
3. Boom Bap (Lo-fi, study sessions) - High Replay/Watch Time.

{{#if includeFastestTo1M}}
ALSO EVALUATE THESE 7 FORMATS THAT HIT 1M SUBS FASTEST:
1. AI Job Replacement (Tools that replace Excel, etc.) - High CPM.
2. "What Happens If..." Body Facts (Biology curiosity hooks).
3. Billionaire & Luxury Lifestyle (Elon/Bezos routines).
4. Crazy History Stories (Short storytelling).
5. Dark Psychology Tricks (Mind hacks) - Extreme retention.
6. Satisfying Factory Processes (Visual dopamine).
7. "Top 3" Micro-Learning (Simple scaling).
{{/if}}

STRICT VIRAL FORMULA (30s):
- 0–2s: Curiosity Hook (Shock the brain)
- 2–12s: Explanation
- 12–25s: Reveal
- 25–30s: Loop Hook (Seamless replay)

Identify "Viral Multiplication" triggers: If a video hits 500K views, suggest how to generate 10 similar clones.

Evaluate each niche for:
1. Trend Velocity
2. Stacking Potential (Can we build 10-20 channels on this?)
3. Monetization Layers (Ads, Affiliates, Funnels)`
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
