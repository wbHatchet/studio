
'use server';
/**
 * @fileOverview An AI agent that scans viral signals across social platforms to predict the next big Lo-Fi trends.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrendPredictionInputSchema = z.object({
  scannedPlatforms: z.array(z.string()).describe('Platforms to scan (e.g., TikTok, Reddit, YouTube).'),
  currentSignals: z.string().describe('Raw data or summaries of current social chatter.'),
});

const TrendOutputSchema = z.object({
  detectedSignals: z.array(z.object({
    subject: z.string(),
    type: z.string(),
    growth: z.string(),
    confidence: z.enum(['Low', 'Medium', 'High']),
    nicheRecommendation: z.string()
  })),
  strategicSummary: z.string().describe('Overall recommendation for channel growth.')
});

export async function predictTrends(input: z.infer<typeof TrendPredictionInputSchema>) {
  return predictTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trendPredictionPrompt',
  input: {schema: TrendPredictionInputSchema},
  output: {schema: TrendOutputSchema},
  prompt: `You are a viral trend specialist. Analyze the following social signals from {{{scannedPlatforms}}}:

Signals: {{{currentSignals}}}

Identify 3-5 emerging Lo-Fi trends before they explode. For each, provide a subject, type, growth percentage estimate, confidence level, and a recommended micro-niche.
`
});

const predictTrendsFlow = ai.defineFlow(
  {
    name: 'predictTrendsFlow',
    inputSchema: TrendPredictionInputSchema,
    outputSchema: TrendOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
