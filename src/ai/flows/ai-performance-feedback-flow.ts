'use server';
/**
 * @fileOverview An AI agent that analyzes channel performance data and suggests improvements for content generation strategy.
 *
 * - aiPerformanceFeedback - A function that handles the AI performance feedback process.
 * - AiPerformanceFeedbackInput - The input type for the aiPerformanceFeedback function.
 * - AiPerformanceFeedbackOutput - The return type for the aiPerformanceFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiPerformanceFeedbackInputSchema = z.object({
  channelNiche: z.string().describe('A description of the YouTube channel\'s niche.'),
  currentContentStrategy: z
    .string()
    .describe('A description of the current content strategy being employed.'),
  performanceData: z
    .array(
      z.object({
        title: z.string().describe('The title of the content item.'),
        views: z.number().describe('The number of views for the content item.'),
        ctr: z.number().describe('The click-through rate (CTR) for the content item.'),
        watchTimeMinutes: z.number().describe('The total watch time in minutes for the content item.'),
        beatSales: z.number().describe('The number of associated beat sales for the content item.'),
        publicationDate: z.string().describe('The publication date of the content item (e.g., YYYY-MM-DD).'),
      })
    )
    .describe('An array of performance data objects for individual content items.'),
  totalViewsThisWeek: z.number().describe('The total number of views across the channel for the current week.'),
  totalBeatSalesThisWeek: z
    .number()
    .describe('The total number of beat sales across the channel for the current week.'),
});
export type AiPerformanceFeedbackInput = z.infer<typeof AiPerformanceFeedbackInputSchema>;

const AiPerformanceFeedbackOutputSchema = z.object({
  summaryAnalysis: z
    .string()
    .describe('A comprehensive summary and analysis of the provided performance data.'),
  successfulPatterns: z
    .array(z.string())
    .describe('A list of identified successful content patterns or themes.'),
  strategyImprovements: z
    .array(z.string())
    .describe('Actionable suggestions for refining the content generation strategy.'),
  recommendations: z.string().describe('General recommendations for further optimization.'),
});
export type AiPerformanceFeedbackOutput = z.infer<typeof AiPerformanceFeedbackOutputSchema>;

export async function aiPerformanceFeedback(
  input: AiPerformanceFeedbackInput
): Promise<AiPerformanceFeedbackOutput> {
  return aiPerformanceFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPerformanceFeedbackPrompt',
  input: { schema: AiPerformanceFeedbackInputSchema },
  output: { schema: AiPerformanceFeedbackOutputSchema },
  prompt: `You are an expert YouTube channel performance analyst and content strategist for Lo-Fi music channels.
Your goal is to analyze the provided performance data and existing strategy, then offer actionable insights to improve the content generation process and optimize for better results.

Channel Niche: {{{channelNiche}}}
Current Content Strategy: {{{currentContentStrategy}}}

Performance Data for individual content items:
{{#each performanceData}}
- Title: {{{title}}}, Views: {{{views}}}, CTR: {{{ctr}}}%, Watch Time: {{{watchTimeMinutes}}} minutes, Beat Sales: {{{beatSales}}}, Publication Date: {{{publicationDate}}}
{{/each}}

Overall Performance for the week:
- Total Views This Week: {{{totalViewsThisWeek}}}
- Total Beat Sales This Week: {{{totalBeatSalesThisWeek}}}

Based on the above data, perform a comprehensive analysis to identify successful content patterns, suggest concrete improvements for the future content generation strategy, and provide general recommendations for optimization.
`,
});

const aiPerformanceFeedbackFlow = ai.defineFlow(
  {
    name: 'aiPerformanceFeedbackFlow',
    inputSchema: AiPerformanceFeedbackInputSchema,
    outputSchema: AiPerformanceFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('AI did not return an output.');
    }
    return output;
  }
);
