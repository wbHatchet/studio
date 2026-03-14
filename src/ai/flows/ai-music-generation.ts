'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating detailed, niche-specific prompts
 * for AI music generators, focusing on instrumental Lo-Fi tracks.
 *
 * - generateMusicPrompt - A function that orchestrates the generation of music prompts.
 * - GenerateMusicPromptInput - The input type for the generateMusicPrompt function.
 * - GenerateMusicPromptOutput - The return type for the generateMusicPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateMusicPromptInputSchema = z.object({
  nicheConcept: z
    .string()
    .describe(
      'A brief description of the micro-niche for the Lo-Fi track (e.g., "rainy city nights", "cozy cafe study session").'
    ),
  mood: z
    .string()
    .describe('The desired emotional tone of the music (e.g., "calm", "nostalgic", "upbeat").'),
  keyInstruments: z
    .string()
    .describe(
      'Key instruments to feature (e.g., "gentle piano, vinyl crackle, subtle drums", "mellow synth pads, acoustic guitar").'
    ),
  tempoDescription: z
    .string()
    .describe(
      'Describe the tempo (e.g., "slow and relaxed, 70-80 BPM", "medium, groovy, 90-100 BPM").'
    ),
  targetDuration: z
    .string()
    .describe(
      'The desired duration or loop characteristic of the track (e.g., "a 5-minute track", "a seamlessly looping 30-minute background track").'
    ),
  additionalInstructions: z
    .string()
    .optional()
    .describe('Any other specific instructions or elements to include in the music generation prompt.'),
});
export type GenerateMusicPromptInput = z.infer<
  typeof GenerateMusicPromptInputSchema
>;

// Output Schema
const GenerateMusicPromptOutputSchema = z.object({
  musicGeneratorPrompt: z
    .string()
    .describe(
      'A detailed prompt string optimized for an AI music generator, describing the Lo-Fi track to be created.'
    ),
  musicDescription: z
    .string()
    .describe('A human-readable description of the Lo-Fi track to be generated.'),
});
export type GenerateMusicPromptOutput = z.infer<
  typeof GenerateMusicPromptOutputSchema
>;

export async function generateMusicPrompt(
  input: GenerateMusicPromptInput
): Promise<GenerateMusicPromptOutput> {
  return generateMusicPromptFlow(input);
}

const musicPromptGenerator = ai.definePrompt({
  name: 'musicPromptGenerator',
  input: {schema: GenerateMusicPromptInputSchema},
  output: {schema: GenerateMusicPromptOutputSchema},
  prompt: `You are an expert music producer specializing in creating detailed prompts for AI music generators to produce high-quality instrumental Lo-Fi tracks. Your goal is to craft a comprehensive prompt that an AI like Suno AI could use to synthesize music matching the user's specifications.

Based on the following inputs, generate two things:
1. A detailed 'musicGeneratorPrompt' that includes genre, sub-genre, mood, instrumentation, tempo, and any specific effects or characteristics. Be descriptive and precise.
2. A 'musicDescription' that is a human-readable summary of the Lo-Fi track to be generated.

Micro-Niche Concept: {{{nicheConcept}}}
Desired Mood: {{{mood}}}
Key Instruments: {{{keyInstruments}}}
Tempo Description: {{{tempoDescription}}}
Target Duration/Loop: {{{targetDuration}}}
Additional Instructions: {{{additionalInstructions}}}

Example 'musicGeneratorPrompt' format:
"Genre: Lo-fi Hip Hop. Sub-genre: Chillhop. Mood: Calm, Reflective. Instrumentation: Warm Rhodes piano chords, gentle boom-bap drums with subtle vinyl crackle, smooth upright bass, distant atmospheric synth pad. Tempo: Slow, 78 BPM. Structure: Smooth, continuous loop suitable for background music. Effects: Light reverb, tape saturation. Duration: Approximately 5 minutes, designed for looping."

Example 'musicDescription' format:
"A calm and reflective chillhop track featuring warm Rhodes piano, gentle boom-bap drums, upright bass, and atmospheric synths, perfect for a rainy city night ambiance."

Now, generate the output based on the provided inputs.`,
});

const generateMusicPromptFlow = ai.defineFlow(
  {
    name: 'generateMusicPromptFlow',
    inputSchema: GenerateMusicPromptInputSchema,
    outputSchema: GenerateMusicPromptOutputSchema,
  },
  async (input) => {
    const {output} = await musicPromptGenerator(input);
    if (!output) {
      throw new Error('Failed to generate music prompt output.');
    }
    return output;
  }
);
