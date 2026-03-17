'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating music prompts and
 * triggering generation via Suno AI automation logic.
 * 
 * - generateMusicPrompt - A function that orchestrates the generation of music prompts.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateMusicPromptInputSchema = z.object({
  referenceUrl: z
    .string()
    .optional()
    .describe('A link to a trendy Lo-Fi song to inspire the generation.'),
  nicheConcept: z
    .string()
    .describe('A brief description of the micro-niche for the Lo-Fi track.'),
  mood: z
    .string()
    .describe('The desired emotional tone of the music.'),
  keyInstruments: z
    .string()
    .describe('Key instruments to feature.'),
  tempoDescription: z
    .string()
    .describe('Describe the tempo (e.g., 70-80 BPM).'),
  targetDuration: z
    .string()
    .describe('The desired duration or loop characteristic.'),
  additionalInstructions: z
    .string()
    .optional()
    .describe('Any other specific instructions.'),
  apiEndpoint: z.string().optional().describe('Automation endpoint URL.'),
});
export type GenerateMusicPromptInput = z.infer<typeof GenerateMusicPromptInputSchema>;

// Output Schema
const GenerateMusicPromptOutputSchema = z.object({
  musicGeneratorPrompt: z
    .string()
    .describe('A detailed prompt string optimized for Suno AI.'),
  musicDescription: z
    .string()
    .describe('A human-readable summary.'),
  generationId: z.string().optional().describe('The automation task ID.'),
  status: z.string().optional().describe('The status of the task.'),
});
export type GenerateMusicPromptOutput = z.infer<typeof GenerateMusicPromptOutputSchema>;

export async function generateMusicPrompt(
  input: GenerateMusicPromptInput
): Promise<GenerateMusicPromptOutput> {
  return generateMusicPromptFlow(input);
}

const musicPromptGenerator = ai.definePrompt({
  name: 'musicPromptGenerator',
  input: {schema: GenerateMusicPromptInputSchema},
  output: {schema: GenerateMusicPromptOutputSchema},
  prompt: `You are an expert music producer specializing in high-quality instrumental Lo-Fi tracks. 

{{#if referenceUrl}}
Inspired by this reference: {{{referenceUrl}}}
{{/if}}

Micro-Niche Concept: {{{nicheConcept}}}
Desired Mood: {{{mood}}}
Key Instruments: {{{keyInstruments}}}
Tempo Description: {{{tempoDescription}}}
Target Duration/Loop: {{{targetDuration}}}

Generate:
1. A detailed 'musicGeneratorPrompt' optimized for Suno AI including genre, sub-genre, mood, and effects.
2. A 'musicDescription' summary.`,
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

    // Logic for autonomous generation trigger
    if (input.apiEndpoint) {
      try {
        const res = await fetch(`${input.apiEndpoint}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: output.musicGeneratorPrompt,
            make_instrumental: true,
            wait_audio: false
          })
        });
        
        if (res.ok) {
          const data = await res.json();
          return { 
            ...output, 
            generationId: data.id || "triggered",
            status: "Success"
          };
        }
      } catch (e) {
        console.error('Automation endpoint failed', e);
      }
    }

    return output;
  }
);
