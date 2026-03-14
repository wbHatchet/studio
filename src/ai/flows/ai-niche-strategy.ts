'use server';
/**
 * @fileOverview An AI agent that analyzes YouTube trends, competition, and keyword data
 * to identify profitable micro-niches, artists, and thematic concepts for Lo-Fi channels.
 *
 * - aiNicheStrategy - A function that handles the micro-niche strategy analysis process.
 * - AiNicheStrategyInput - The input type for the aiNicheStrategy function.
 * - AiNicheStrategyOutput - The return type for the aiNicheStrategy function.
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
    .array(z.string())
    .describe('A list of highly profitable micro-niches for Lo-Fi channels.'),
  suggestedArtists: z
    .array(z.string())
    .describe('A list of suggested artists or artist styles that would fit the identified micro-niches.'),
  suggestedThematicConcepts: z
    .array(z.string())
    .describe('A list of thematic concepts or visual styles that would resonate with the target audience.'),
  actionableInsights: z
    .string()
    .describe('Actionable insights and strategic recommendations for channel development and content creation.'),
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
  prompt: `You are an expert AI-driven micro-niche strategist for YouTube Lo-Fi channels. Your goal is to analyze provided data and identify highly profitable, underserved micro-niches, suggest relevant artists/styles, and thematic concepts for new Lo-Fi channels.

Analyze the following information:

YouTube Trends: {{{youtubeTrends}}}
Competition Analysis: {{{competitionAnalysis}}}
Keyword Data: {{{keywordData}}}

Based on this data, provide the following:
1. A list of 3-5 highly profitable micro-niches (e.g., "Lo-Fi Beats for Coding", "Chill Lo-Fi with Rain Sounds", "Vintage Anime Lo-Fi").
2. A list of 3-5 suggested artists or artist styles that would fit these micro-niches.
3. A list of 3-5 thematic concepts or visual styles that would resonate with the target audience (e.g., "Cozy Study Space", "Cyberpunk City Nights", "Autumn Forest Retreat").
4. Actionable insights and strategic recommendations for channel development, content creation, and potential monetization.

Format your response as a JSON object strictly adhering to the output schema.`,
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
