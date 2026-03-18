
'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating YouTube SEO metadata.
 * It takes a micro-niche, video topic, and keywords as input,
 * and outputs an optimized video video title, description, and a list of tags.
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
      'A detailed YouTube video description following the Type Beat / Lo-Fi template.'
    ),
  tags: z.array(z.string()).describe('A list of high-ranking tags under 500 characters total.'),
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
  prompt: `You are an expert YouTube SEO specialist for industrial Lo-Fi and Type Beat channels. 
Your goal is to generate comprehensive, algorithm-optimized YouTube metadata (title, description, tags) that follows the EXACT Power SEO blueprint provided.

--- TITLE FORMAT ---
[FREE] {{{artistName}}} Type Beat - "[Beat Name]" (or similar viral structure like "Emotion + Scene + Use Case")

--- DESCRIPTION TEMPLATE (Strict adherence required) ---

💵 Purchase This Beat (Untagged): 
🔥 BUY 1 - GET 2 FREE! / BUY 2 - GET 5 FREE! 🔥

BPM: {{{bpm}}}
KEY: {{{key}}}

⚡️ SOCIALS:
Beatstore | [Link]
Email | [Email]
Instagram | [Link]

[FREE] {{{artistName}}} Type Beat - "[Beat Name]"

*THIS BEAT IS FREE FOR NON-PROFIT USE ONLY, WHICH MEANS YOU CANNOT MAKE MONEY OFF OF IT UNLESS YOU BUY A LICENSE FROM MY STORE*

--------------------

[An atmospheric SEO-optimized paragraph (150 words) that describes the beat's vibe (e.g., "{{{videoTopic}}}") and naturally stacks keywords like "{{{microNiche}}}", "{{{artistName}}} type beat 2026", and "{{{artistName}}} instrumental". Mention it is perfect for artists looking for high-quality production.]

[A line of 15-20 high-ranking keywords separated by commas]

[3-5 relevant hashtags]

--------------------

--- TAGGING BLUEPRINT (CRITICAL) ---
Your 'tags' output must be an array of strings. Prioritize these high-velocity terms:
lofi beats, lofi study music, harbor lofi, moon lofi, lofi radio, study beats, lofi chill, relaxing lofi music, late night lofi, lofi sleep music, lofi hip hop, study music 2026, rain lofi, coding music, focus music, chill beats, ambient lofi, lofi mix, deep focus music, background study music, cozy lofi beats, nighttime lofi, chill study beats, peaceful lofi music, sleep lofi radio.

Context for Generation:
- Artist Name: {{{artistName}}}
- Micro-Niche: {{{microNiche}}}
- Video Topic: {{{videoTopic}}}
- BPM: {{{bpm}}}
- Key: {{{key}}}
- Extra Keywords: {{#each keywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Ensure the description is formatted exactly like the template with the emojis and spacing provided. 
Return exactly 20-30 tags. Total character count across all tags must be under 500.`,
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
