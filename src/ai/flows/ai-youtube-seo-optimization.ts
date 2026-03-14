'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating YouTube SEO metadata.
 * It takes a micro-niche, video topic, and keywords as input,
 * and outputs an optimized video title, description, and a list of tags.
 *
 * - aiYoutubeSeoOptimization - A function that generates YouTube SEO metadata.
 * - AiYoutubeSeoOptimizationInput - The input type for the aiYoutubeSeoOptimization function.
 * - AiYoutubeSeoOptimizationOutput - The return type for the aiYoutubeSeoOptimization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiYoutubeSeoOptimizationInputSchema = z.object({
  microNiche: z
    .string()
    .describe('The specific micro-niche for the Lo-Fi channel, e.g., "Cozy Autumn Lofi Beats for Studying".'),
  videoTopic: z
    .string()
    .describe('A brief description of the video content, e.g., "A new track featuring chill piano melodies and rain sounds".'),
  keywords: z
    .array(z.string())
    .describe('A list of target keywords for the video.'),
  artistName: z.string().optional().describe('The name of the artist for credit.'),
  bpm: z.number().optional().describe('Beats per minute of the music.'),
  key: z.string().optional().describe('Musical key of the track.'),
  licensingInfo: z.string().optional().describe('Licensing details for the music.'),
});
export type AiYoutubeSeoOptimizationInput = z.infer<typeof AiYoutubeSeoOptimizationInputSchema>;

const AiYoutubeSeoOptimizationOutputSchema = z.object({
  title: z.string().describe('An optimized and engaging YouTube video title.'),
  description: z
    .string()
    .describe(
      'A detailed YouTube video description, including call-to-actions, BPM, key, and licensing info if provided.'
    ),
  tags: z.array(z.string()).describe('A list of relevant tags and hashtags for YouTube SEO.'),
});
export type AiYoutubeSeoOptimizationOutput = z.infer<typeof AiYoutubeSeoOptimizationOutputSchema>;

export async function aiYoutubeSeoOptimization(
  input: AiYoutubeSeoOptimizationInput
): Promise<AiYoutubeSeoOptimizationOutput> {
  return aiYoutubeSeoOptimizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiYoutubeSeoOptimizationPrompt',
  input: {schema: AiYoutubeSeoOptimizationInputSchema},
  output: {schema: AiYoutubeSeoOptimizationOutputSchema},
  prompt: `You are an expert YouTube SEO specialist for Lo-Fi music channels.
Your goal is to generate comprehensive, micro-niche-optimized YouTube metadata (title, description, tags) for a video.

Here is the information about the video:
Micro-Niche: {{{microNiche}}}
Video Topic: {{{videoTopic}}}
Target Keywords: {{#each keywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{#if artistName}}Artist: {{{artistName}}}{{/if}}
{{#if bpm}}BPM: {{{bpm}}}{{/if}}
{{#if key}}Key: {{{key}}}{{/if}}
{{#if licensingInfo}}Licensing: {{{licensingInfo}}}{{/if}}

Generate the following:

1. An engaging and optimized YouTube video title (max 70 characters) that includes relevant keywords.
2. A detailed YouTube video description (minimum 200 words) that includes:
    - A compelling introduction.
    - Purchase/License links (placeholder).
    - BPM and Key info.
    - Social media links (placeholder).
    - SEO paragraph stacking keywords naturally.
    - 5 relevant hashtags.
3. A list of 20-30 relevant tags for the YouTube tags field.

Use the "FREE {Artist} Type Beat" title format where applicable.`,
});

const aiYoutubeSeoOptimizationFlow = ai.defineFlow(
  {
    name: 'aiYoutubeSeoOptimizationFlow',
    inputSchema: AiYoutubeSeoOptimizationInputSchema,
    outputSchema: AiYoutubeSeoOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate SEO optimization.');
    }
    return output;
  }
);
