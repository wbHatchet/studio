const { executeSunoGeneration } = require('../../src/services/suno-automation');

/**
 * Maestro Music Agent - Entry point for Lobster Workflow.
 * Orchestrates the Playwright generation run based on pipeline params.
 */
async function main() {
  // Params passed via environment or command line by the Pipeline Worker
  const prompt = process.env.AGENT_PROMPT || 'Lofi harbor beats, moonlit atmosphere';
  const instrumental = process.env.AGENT_INSTRUMENTAL === 'true';

  console.log(`[Maestro] Initializing node for prompt: ${prompt}`);

  try {
    const result = await executeSunoGeneration({
      prompt,
      makeInstrumental: instrumental
    });

    console.log(`[Maestro] Success: ${result.message}`);
    process.exit(0);
  } catch (err) {
    console.error(`[Maestro] Agent Node Failed: ${err.message}`);
    process.exit(1);
  }
}

main();
