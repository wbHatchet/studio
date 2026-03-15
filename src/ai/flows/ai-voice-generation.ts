'use server';
/**
 * @fileOverview An AI agent that generates scripts optimized for the "$1M AI YouTube Network Blueprint".
 * Refined for 30-second viral YouTube shorts with strict 4-stage retention timing.
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
    hook: z.string().describe('0-2s Shock Hook'),
    curiosity: z.string().describe('2-10s Curiosity Gap'),
    reveal: z.string().describe('10-20s Value Delivery'),
    twist: z.string().describe('20-30s Twist/Loop Hook'),
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
  prompt: `You are a viral YouTube Shorts scriptwriter for a $1M/year automation network.
Your goal is to write a high-retention, 30-second script about: {{{topic}}}
Tone: {{{tone}}}

STRICT $1M BLUEPRINT STRUCTURE (30s Total):
1. SHOCK HOOK (0-2s): A scroll-stopping sentence that creates immediate shock or curiosity.
2. CURIOSITY GAP (2-10s): Rapidly set the stage and deepen the mystery. No fluff.
3. THE REVEAL (10-20s): Deliver the core secret or story payoff with high velocity.
4. TWIST/LOOP (20-30s): A sudden twist or transition that makes the video loop seamlessly.

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
