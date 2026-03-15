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
      'A detailed YouTube video description following the Type Beat template.'
    ),
  tags: z.array(z.string()).describe('A list of 20-30 relevant tags for the YouTube tags field.'),
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
  prompt: `You are an expert YouTube SEO specialist for professional Lo-Fi and Type Beat channels.
Your goal is to generate comprehensive, micro-niche-optimized YouTube metadata (title, description, tags) that follows the EXACT template and tagging blueprint provided.

--- TITLE FORMAT ---
[FREE] {{{artistName}}} Type Beat - "[Beat Name]" (or similar viral format)

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

[An atmospheric SEO-optimized paragraph (150 words) that describes the beat's vibe (e.g., "{{{videoTopic}}}") and naturally stacks keywords like "{{{microNiche}}}", "{{{artistName}}} type beat 2025", and "{{{artistName}}} instrumental". Mention it is perfect for artists looking for high-quality production.]

[A line of 6-10 keywords separated by commas]

[3-5 relevant hashtags]

--------------------

--- TAGGING BLUEPRINT (CRITICAL) ---
For the tags, you MUST use the following format for EACH artist/keyword name provided (e.g., if artist is Drake). 
Replace "keyword" with the specific name:

"keyword type beat, free keyword type beat, keyword type beat 2025, free keyword type beat 2025, keyword type beat free 2025, keyword type beat free, type beat, free type beat, type beat 2025, free type beat 2025, type beat free 2025, type beat free, beat, beats, type beats, free type beats"

If there are multiple artists (e.g., Drake x Tory Lanez), duplicate this entire set for each artist.

Context for Generation:
- Artist Name: {{{artistName}}}
- Micro-Niche: {{{microNiche}}}
- Video Topic: {{{videoTopic}}}
- BPM: {{{bpm}}}
- Key: {{{key}}}
- Extra Keywords: {{#each keywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Ensure the description is formatted exactly like the template with the emojis and spacing provided. 
Return the tags as an array of strings.`,
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
