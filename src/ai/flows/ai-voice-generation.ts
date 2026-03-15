'use server';
/**
 * @fileOverview An AI agent that generates scripts and optimizes them for high-retention text-to-speech.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceGenerationInputSchema = z.object({
  topic: z.string().describe('The main topic or niche of the video.'),
  tone: z.string().describe('The personality of the voice (e.g., Energetic, Narrative, Deep).'),
  targetDuration: z.number().describe('Desired length in seconds.'),
});

const VoiceOutputSchema = z.object({
  script: z.string().describe('The optimized script for ElevenLabs.'),
  retentionTriggers: z.array(z.string()).describe('List of points where visual/audio changes should occur.'),
  estimatedWordCount: z.number(),
});

export async function generateVoiceScript(input: z.infer<typeof VoiceGenerationInputSchema>) {
  return generateVoiceScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceGenerationPrompt',
  input: {schema: VoiceGenerationInputSchema},
  output: {schema: VoiceOutputSchema},
  prompt: `You are an expert scriptwriter for faceless YouTube channels. 
Create a high-retention script about: {{{topic}}}
Tone: {{{tone}}}
Duration: {{{targetDuration}}} seconds

Ensure the script includes emotional hooks and follows a structure that maximizes AVD (Average View Duration).
`
});

const generateVoiceScriptFlow = ai.defineFlow(
  {
    name: 'generateVoiceScriptFlow',
    inputSchema: VoiceGenerationInputSchema,
    outputSchema: VoiceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
