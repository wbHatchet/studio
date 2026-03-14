'use server';
/**
 * @fileOverview This file provides a Genkit flow for generating prompts for AI image and animation tools.
 *
 * - aiVisualsAndAnimation - A function that generates prompts for AI image and animation tools based on user input.
 * - AiVisualsAndAnimationInput - The input type for the aiVisualsAndAnimation function.
 * - AiVisualsAndAnimationOutput - The return type for the aiVisualsAndAnimation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiVisualsAndAnimationInputSchema = z.object({
  description: z
    .string()
    .describe('A detailed description of the desired lo-fi artwork and animation scene.'),
  mood: z
    .string()
    .optional()
    .describe('The overall mood or atmosphere of the scene (e.g., "calm", "melancholic", "dreamy").'),
  style: z
    .string()
    .optional()
    .describe('The artistic style for the image (e.g., "anime style", "pixel art", "vaporwave art").'),
  animationEffect: z
    .string()
    .optional()
    .describe(
      'Describe the desired animation effect on the image (e.g., "subtle rain falling", "steam rising from a cup", "leaves rustling").'
    )
});
export type AiVisualsAndAnimationInput = z.infer<
  typeof AiVisualsAndAnimationInputSchema
>;

const AiVisualsAndAnimationOutputSchema = z.object({
  imagePrompt: z
    .string()
    .describe('A detailed prompt for an AI image generation tool to create the lo-fi artwork.'),
  animationPrompt: z
    .string()
    .describe('A detailed prompt for an AI animation tool to animate the generated image.')
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
  prompt: `You are an expert AI prompt engineer specializing in creating Lo-Fi aesthetics for visual and animation tools.
Your task is to generate two distinct prompts:
1. A detailed prompt for an AI image generation tool (e.g., DALL-E, Midjourney) to produce a high-quality Lo-Fi artwork.
2. A detailed prompt for an AI animation tool (e.g., Pika AI, Hailuo AI) to animate the static image generated from the first prompt.

Consider the user's description and preferences:
- **Core Scene Description**: {{{description}}}
{{#if mood}}- **Overall Mood/Atmosphere**: {{{mood}}}{{/if}}
{{#if style}}- **Artistic Style**: {{{style}}}{{/if}}
{{#if animationEffect}}- **Desired Animation Effect**: {{{animationEffect}}}{{/if}}

For the image prompt, ensure it includes elements typical of Lo-Fi aesthetics, such as soft lighting, vintage feel, cozy settings, atmospheric effects, and a sense of calm or introspection.
For the animation prompt, focus on subtle, looping animations that enhance the Lo-Fi atmosphere described in the image prompt, building directly upon the visual elements.

Generate the output in JSON format, strictly adhering to the following schema:
{{jsonSchema AiVisualsAndAnimationOutputSchema}}`
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
