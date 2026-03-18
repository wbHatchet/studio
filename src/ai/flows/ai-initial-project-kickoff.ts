'use server';
/**
 * @fileOverview AI agent that kicks off a new project by expanding a raw topic into a full Lo-Fi strategy.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KickoffInputSchema = z.object({
  topic: z.string().describe('The raw video topic or idea.'),
  niche: z.string().describe('The primary niche selected by the user.'),
});

const KickoffOutputSchema = z.object({
  expandedTopic: z.string().describe('A viral-optimized version of the topic.'),
  mood: z.string().describe('The emotional profile for music and visuals.'),
  visualPrompt: z.string().describe('Base prompt for image generation.'),
  musicStyle: z.string().describe('Detailed style description for Suno.'),
  strategyInsight: z.string().describe('Initial strategy for high retention.'),
});

export async function kickoffProject(input: z.infer<typeof KickoffInputSchema>) {
  return kickoffProjectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'kickoffProjectPrompt',
  input: {schema: KickoffInputSchema},
  output: {schema: KickoffOutputSchema},
  prompt: `You are the Director Agent for an AI Media Empire.
Expand the following project idea into a full production strategy.

Topic: {{{topic}}}
Niche: {{{niche}}}

Provide:
1. A viral-optimized 'expandedTopic' (e.g., adding pattern-interrupt words).
2. A 'mood' profile (e.g., "Nostalgic, Oceanic, Rain-heavy").
3. A 'visualPrompt' for DALL-E (Lo-Fi aesthetic, 4k detail).
4. A 'musicStyle' for Suno (BPM, instruments, atmosphere).
5. A 'strategyInsight' on how to maximize Average View Duration (AVD) for this specific topic.`
});

const kickoffProjectFlow = ai.defineFlow(
  {
    name: 'kickoffProjectFlow',
    inputSchema: KickoffInputSchema,
    outputSchema: KickoffOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
