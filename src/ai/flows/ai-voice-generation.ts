'use server';
/**
 * @fileOverview An AI agent that generates scripts optimized for the "2026 Viral Formula".
 * Refined for 30-second viral YouTube shorts with strict retention timing.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceGenerationInputSchema = z.object({
  topic: z.string().describe('The main topic or niche of the video.'),
  tone: z.string().describe('The personality of the voice (e.g., Energetic, Dark Psychology, Narrative).'),
  targetDuration: z.number().default(30).describe('Desired length in seconds.'),
});

const VoiceOutputSchema = z.object({
  script: z.string().describe('The optimized script for ElevenLabs.'),
  retentionTriggers: z.array(z.string()).describe('List of points where visual/audio changes should occur.'),
  structure: z.object({
    hook: z.string().describe('0-2s Curiosity Hook'),
    explanation: z.string().describe('2-12s Setup'),
    reveal: z.string().describe('12-25s Value Delivery'),
    loop: z.string().describe('25-30s Loop Hook'),
  }),
  estimatedWordCount: z.number(),
  characterCount: z.number(),
});

export async function generateVoiceScript(input: z.infer<typeof VoiceGenerationInputSchema>) {
  return generateVoiceScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceGenerationPrompt',
  input: {schema: VoiceGenerationInputSchema},
  output: {schema: VoiceOutputSchema},
  prompt: `You are a viral YouTube Shorts scriptwriter specializing in the "2026 Cash-Cow" formula.
Your goal is to write a high-retention, 30-second script about: {{{topic}}}
Tone: {{{tone}}}

STRICT VIRAL STRUCTURE (30s Total):
1. CURIOSITY HOOK (0-2s): A scroll-stopping sentence that creates an immediate curiosity gap (e.g., "Use this psychology trick carefully...").
2. EXPLANATION (2-12s): Rapidly set the stage and provide context. No fluff.
3. THE REVEAL (12-25s): Deliver the core value, story payoff, or secret with high velocity.
4. LOOP HOOK (25-30s): A transition or quick CTA that makes the video loop seamlessly or encourages a re-watch.

Retention Triggers: Provide specific timestamps for visual cuts or overlays to maintain 100%+ retention.

Estimated Word Count: A 30s script should be approx 70-85 words.`
});

const generateVoiceScriptFlow = ai.defineFlow(
  {
    name: 'generateVoiceScriptFlow',
    inputSchema: VoiceGenerationInputSchema,
    outputSchema: VoiceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    const result = output!;
    return {
      ...result,
      characterCount: result.script.length
    };
  }
);

/**
 * Synthesizes text to speech using ElevenLabs.
 * Optimized for high-volume batch processing.
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
