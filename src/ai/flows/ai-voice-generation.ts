'use server';
/**
 * @fileOverview An AI agent that generates batches of scripts optimized for the "$1M AI YouTube Network Blueprint".
 * Refined for 30-second viral YouTube shorts with strict 4-stage retention timing and the "Master Prompt" logic.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceGenerationInputSchema = z.object({
  niche: z.enum([
    'AI tools',
    'Psychology tricks',
    'Weird history',
    'Human body facts',
    'Luxury lifestyle',
    'Money habits',
    'Tech discoveries'
  ]).describe('The high-viral niche for the scripts.'),
  topicDetail: z.string().optional().describe('Specific details or keywords to focus on.'),
  batchSize: z.number().min(1).max(10).default(3).describe('Number of scripts to generate in this run.'),
});

const ScriptItemSchema = z.object({
  title: z.string().describe('Catchy internal title for the script.'),
  structure: z.object({
    hook: z.string().describe('0-2s Pattern-Interrupt Hook'),
    curiosity: z.string().describe('2-10s Curiosity Gap'),
    facts: z.array(z.string()).describe('3 rapid facts (10-20s)'),
    twist: z.string().describe('20-30s Twist + Loop'),
  }),
  fullScript: z.string().describe('The optimized full script text (max 80 words).'),
  estimatedWordCount: z.number(),
});

const VoiceOutputSchema = z.object({
  scripts: z.array(ScriptItemSchema),
  nicheMetadata: z.object({
    cpmEstimate: z.string(),
    targetRetention: z.string(),
  }),
});

export async function generateVoiceScripts(input: z.infer<typeof VoiceGenerationInputSchema>) {
  return generateVoiceScriptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceGenerationPrompt',
  input: {schema: VoiceGenerationInputSchema},
  output: {schema: VoiceOutputSchema},
  prompt: `You are a viral YouTube Shorts script writer. 
Your goal is to generate {{{batchSize}}} short-form video scripts optimized for high retention for the NICHE: {{{niche}}}.

{{#if topicDetail}}
CONTEXT/TOPIC: {{{topicDetail}}}
{{/if}}

STRICT 4-PART VIRAL STRUCTURE (30s Total):
1. HOOK (0-2 sec): Pattern-Interrupt. Shock the brain immediately. (e.g., "This AI just replaced an entire marketing team.")
2. CURIOSITY (2-10 sec): Reveal something strange but incomplete. (e.g., "Most companies still haven't discovered it.")
3. 3 RAPID FACTS (10-20 sec): Fast dopamine hits. Simple language.
4. TWIST ENDING (20-30 sec): End with a surprise that loops the viewer back to the beginning.

RULES:
- Maximum 80 words per script.
- Fast pacing, simple language, NO filler words.
- High curiosity and "Pattern-Interrupt" logic.

Return exactly {{{batchSize}}} scripts in the specified JSON format.`
});

const generateVoiceScriptsFlow = ai.defineFlow(
  {
    name: 'generateVoiceScriptsFlow',
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
