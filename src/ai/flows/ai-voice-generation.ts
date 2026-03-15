'use server';
/**
 * @fileOverview An AI agent that generates scripts optimized for the "$1M AI YouTube Network Blueprint".
 * Refined for 30-second viral YouTube shorts with strict 4-stage retention timing and pattern-interrupt hooks.
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
    hook: z.string().describe('0-2s Pattern-Interrupt Hook'),
    curiosity: z.string().describe('2-10s Curiosity Gap'),
    value: z.string().describe('10-20s Rapid Value (3 Facts)'),
    twist: z.string().describe('20-30s Twist + Loop'),
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
Your goal is to write a high-retention, 30-second script using the 4-Part Viral Structure.

Topic: {{{topic}}}
Tone: {{{tone}}}

STRICT 4-PART VIRAL STRUCTURE (30s Total):
1. 0–2s: PATTERN-INTERRUPT HOOK. Shock the brain immediately. Use a scroll-stopping shock or curiosity hook. (e.g., "You're using your brain WRONG.")
2. 2–10s: CURIOSITY GAP. Reveal something strange but incomplete. Force the viewer to stay. (e.g., "Scientists discovered X... but nobody talks about WHY.")
3. 10–20s: RAPID VALUE. Give 3 quick facts or rapid dopamine hits. Use the "3-Sentence Script Hack" style—short, punchy, no fluff.
4. 20–30s: TWIST + LOOP. End with a surprise that loops seamlessly back to the beginning to increase replay rate. (e.g., "So the real question is—what memory are you losing tonight?")

REPLAY LOGIC: The last sentence must lead perfectly into the first sentence.

Estimated Word Count: A 30s script should be approx 70-85 words. Structure your output JSON to match the VoiceOutputSchema.`
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
