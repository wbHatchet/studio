
'use server';
/**
 * @fileOverview An AI agent that rewrites video hooks to maximize retention.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HookOptimizationInputSchema = z.object({
  originalScript: z.string().describe('The first 10 seconds of the video script.'),
  toneProfile: z.string().describe('Desired tone (e.g., Mysterious, Scarcity).'),
});

const HookOutputSchema = z.object({
  optimizedHooks: z.array(z.string()).describe('3 viral hook variations.'),
  reasoning: z.string().describe('Why these hooks will reduce swipe rate.')
});

export async function optimizeHooks(input: z.infer<typeof HookOptimizationInputSchema>) {
  return optimizeHooksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'hookOptimizationPrompt',
  input: {schema: HookOptimizationInputSchema},
  output: {schema: HookOutputSchema},
  prompt: `You are a high-retention video editor. Rewrite the following script segment to reduce swipe rate and hook the viewer in under 3 seconds.

Original: {{{originalScript}}}
Tone: {{{toneProfile}}}

Provide 3 viral variations and explain the psychological gap used for each.
`
});

const optimizeHooksFlow = ai.defineFlow(
  {
    name: 'optimizeHooksFlow',
    inputSchema: HookOptimizationInputSchema,
    outputSchema: HookOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
