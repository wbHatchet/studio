'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating music prompts and
 * optionally triggering generation via an unofficial Suno API endpoint.
 *
 * - generateMusicPrompt - A function that orchestrates the generation of music prompts.
 * - GenerateMusicPromptInput - The input type for the generateMusicPrompt function.
 * - GenerateMusicPromptOutput - The return type for the generateMusicPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateMusicPromptInputSchema = z.object({
  referenceUrl: z
    .string()
    .optional()
    .describe('A link to a trendy Lo-Fi song (e.g. from LoFi Girl) to inspire the generation.'),
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
  apiEndpoint: z.string().optional().describe('Unofficial Suno API endpoint URL.'),
});
export type GenerateMusicPromptInput = z.infer<
  typeof GenerateMusicPromptInputSchema
>;

// Output Schema
const GenerateMusicPromptOutputSchema = z.object({
  musicGeneratorPrompt: z
    .string()
    .describe(
      'A detailed prompt string optimized for an AI music generator (like Suno AI), describing the Lo-Fi track to be created.'
    ),
  musicDescription: z
    .string()
    .describe('A human-readable description of the Lo-Fi track to be generated.'),
  generationId: z.string().optional().describe('The ID of the music generation task if triggered.'),
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
  prompt: `You are an expert music producer specializing in creating detailed prompts for AI music generators to produce high-quality instrumental Lo-Fi tracks. 

{{#if referenceUrl}}
Inspired by this trendy Lo-Fi reference: {{{referenceUrl}}}
{{/if}}

Your goal is to craft a comprehensive prompt that an AI like Suno AI could use to synthesize music matching the user's specifications.

Micro-Niche Concept: {{{nicheConcept}}}
Desired Mood: {{{mood}}}
Key Instruments: {{{keyInstruments}}}
Tempo Description: {{{tempoDescription}}}
Target Duration/Loop: {{{targetDuration}}}
Additional Instructions: {{{additionalInstructions}}}

Generate:
1. A detailed 'musicGeneratorPrompt' that includes genre, sub-genre, mood, instrumentation, tempo, and effects. It should be optimized for Suno AI.
2. A 'musicDescription' that is a human-readable summary.

Example 'musicGeneratorPrompt' format:
"Genre: Lo-fi Hip Hop. Sub-genre: Chillhop. Mood: Calm, Reflective. Instrumentation: Warm Rhodes piano chords, gentle boom-bap drums with subtle vinyl crackle, smooth upright bass, distant atmospheric synth pad. Tempo: Slow, 78 BPM. Structure: Smooth, continuous loop suitable for background music. Effects: Light reverb, tape saturation."

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

    // Logic for unofficial Suno API (GitHub: Suno-API/Suno-API)
    // If an apiEndpoint is provided, we can simulate or trigger the /api/generate call
    if (input.apiEndpoint) {
      console.log(`Triggering music generation at: ${input.apiEndpoint}`);
      // In a real implementation, you would perform a fetch request here:
      // const res = await fetch(`${input.apiEndpoint}/api/generate`, {
      //   method: 'POST',
      //   body: JSON.stringify({ prompt: output.musicGeneratorPrompt, make_instrumental: true })
      // });
      // const data = await res.json();
      // return { ...output, generationId: data.id };
    }

    return output;
  }
);
