'use server';
/**
 * @fileOverview An AI agent that generates scripts and optimizes them for high-retention text-to-speech.
 * Refined for 30-second viral YouTube shorts as per the Ultra-Scale Factory blueprint.
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
  prompt: `You are a viral YouTube Shorts scriptwriter specializing in high-velocity, faceless content.
Your goal is to write a high-retention, {{{targetDuration}}}-second script about: {{{topic}}}
Tone: {{{tone}}}

STRICT STRUCTURE:
1. THE HOOK (0-3s): Must be a scroll-stopping sentence that creates a curiosity gap.
2. THE PAYOFF (3-{{{targetDuration}}}s): Deliver the story or value quickly with zero fluff.
3. THE LOOP (Final 2s): A seamless transition or quick CTA that encourages a re-watch or subscribe.

Retention Triggers: Provide specific moments (in seconds) where the visual editor should cut to a new clip or add an overlay to prevent swiping.

Estimated Word Count: A 30s script should be approx 70-85 words. A 60s script should be 140-160 words.`
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

/**
 * Synthesizes text to speech using ElevenLabs.
 * @param text The script to synthesize.
 * @param voiceId The ID of the voice to use (default: Adam).
 */
export async function textToSpeech(text: string, voiceId: string = 'pNInz6wQRqcqdc8khIM8') {
  const apiKey = process.env.ELEVENLABS_API_KEY || 'sk_2138300d7f185d5d8b40cdbee0c15caa34eec84bdb85f431';
  
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`ElevenLabs API failed: ${response.status} - ${errorBody}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:audio/mpeg;base64,${buffer.toString('base64')}`;
}
