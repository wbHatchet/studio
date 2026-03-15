
'use server';
/**
 * @fileOverview This file provides a Genkit flow for generating prompts for AI image and animation tools.
 * It is optimized for the 'Hidden Stack' (Runway Gen-3, Pika, Hailuo) to ensure maximum retention visual hooks.
 *
 * - aiVisualsAndAnimation - A function that generates prompts for AI image and animation tools.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiVisualsAndAnimationInputSchema = z.object({
  inputType: z.enum(['text', 'image']).describe('Whether to generate from a description or an existing image.'),
  description: z
    .string()
    .optional()
    .describe('A detailed description or an image reference description.'),
  mood: z
    .string()
    .optional()
    .describe('The overall mood or atmosphere (e.g., "calm", "dreamy").'),
  style: z
    .string()
    .optional()
    .describe('The artistic style (e.g., "anime style", "pixel art").'),
  variationCount: z.number().optional().default(1).describe('How many prompt variations to generate (up to 10).')
});
export type AiVisualsAndAnimationInput = z.infer<
  typeof AiVisualsAndAnimationInputSchema
>;

const PromptPairSchema = z.object({
  imagePrompt: z.string().describe('Detailed prompt for AI image generation (Midjourney/DALL-E/Leonardo).'),
  animationPrompt: z.string().describe('Detailed prompt for AI animation (Runway Gen-3/Pika/Hailuo). Focus on the first 2 seconds hook.')
});

const AiVisualsAndAnimationOutputSchema = z.object({
  variations: z.array(PromptPairSchema).describe('A list of image and animation prompt pairs.')
});
export type AiVisualsAndAnimationOutput = z.infer<
  typeof AiVisualsAndAnimationOutputSchema
>;

export async function aiVisualsAndAnimation(
  input: AiVisualsAndAnimationInput
): Promise<AiVisualsAndAnimationOutput> {
  return aiVisualsAndAnimationFlow(input);
}

const aiVisualsAndAnimationPrompt = ai.definePrompt({
  name: 'aiVisualsAndAnimationPrompt',
  input: {schema: AiVisualsAndAnimationInputSchema},
  output: {schema: AiVisualsAndAnimationOutputSchema},
  prompt: `You are an expert AI prompt engineer specializing in high-retention Lo-Fi aesthetics for YouTube automation.

{{#if (eq inputType "image")}}
The user has provided an image description (inspired by a favorite YouTube or Pinterest image). 
Remove any existing text from your prompt concepts and focus purely on describing the visual scene for Piclumen or Leonardo AI.
{{else}}
The user wants to generate fresh Lo-Fi visual concepts designed to stop the scroll.
{{/if}}

Your task is to generate {{{variationCount}}} variations of:
1. An 'imagePrompt' for high-quality Lo-Fi artwork (soft lighting, vintage feel, cozy settings, 4k detail).
2. An 'animationPrompt' specifically for Runway Gen-3, Pika AI, or Hailuo AI. 
   - Focus on SUBTLE but ENGAGING loops for the background.
   - For the first variation, create a 'Visual Hook' version: Add instructions for a dynamic camera zoom or a sudden light flickering in the first 2 seconds to maximize retention.

Input Context:
- **Description**: {{{description}}}
- **Mood**: {{{mood}}}
- **Style**: {{{style}}}

Generate exactly {{{variationCount}}} variations in JSON format.`
});

const aiVisualsAndAnimationFlow = ai.defineFlow(
  {
    name: 'aiVisualsAndAnimationFlow',
    inputSchema: AiVisualsAndAnimationInputSchema,
    outputSchema: AiVisualsAndAnimationOutputSchema
  },
  async input => {
    const {output} = await aiVisualsAndAnimationPrompt(input);
    if (!output) {
      throw new Error('Failed to generate prompts for visuals and animation.');
    }
    return output;
  }
);
