'use server';
/**
 * @fileOverview An AI agent that analyzes YouTube trends, competition, and keyword data
 * to identify and SCORE profitable micro-niches for the Autonomous Content Studio.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiNicheStrategyInputSchema = z.object({
  youtubeTrends: z
    .string()
    .describe('A description of current YouTube trends relevant to Lo-Fi music.'),
  competitionAnalysis: z
    .string()
    .describe('An analysis of the competitive landscape in the Lo-Fi music niche on YouTube.'),
  keywordData: z
    .string()
    .describe('Relevant keyword data and insights (e.g., from tools like VidIQ or Google Trends).'),
});
export type AiNicheStrategyInput = z.infer<typeof AiNicheStrategyInputSchema>;

const AiNicheStrategyOutputSchema = z.object({
  suggestedMicroNiches: z
    .array(z.object({
      name: z.string(),
      score: z.number().describe('Niche potential score (0-100)'),
      viewVelocity: z.string().describe('Estimate of how fast views are growing'),
      competitionLevel: z.enum(['Low', 'Medium', 'High']),
    }))
    .describe('A list of highly profitable micro-niches with automated scoring.'),
  suggestedArtists: z
    .array(z.string())
    .describe('A list of suggested artists or artist styles.'),
  suggestedThematicConcepts: z
    .array(z.string())
    .describe('A list of thematic concepts or visual styles.'),
  actionableInsights: z
    .string()
    .describe('Actionable strategic recommendations for channel development.'),
});
export type AiNicheStrategyOutput = z.infer<typeof AiNicheStrategyOutputSchema>;

export async function aiNicheStrategy(
  input: AiNicheStrategyInput
): Promise<AiNicheStrategyOutput> {
  return aiNicheStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiNicheStrategyPrompt',
  input: {schema: AiNicheStrategyInputSchema},
  output: {schema: AiNicheStrategyOutputSchema},
  prompt: `You are an expert AI-driven Niche Discovery Engine. 
Analyze the provided market data and identify highly profitable, underserved micro-niches. 

For each niche, calculate an "Opportunity Score" (0-100) based on View Velocity vs. Competition.

YouTube Trends: {{{youtubeTrends}}}
Competition Analysis: {{{competitionAnalysis}}}
Keyword Data: {{{keywordData}}}

Provide a detailed JSON response following the output schema.`,
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
