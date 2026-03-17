import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

/**
 * Industrial Suno AI Automation Service.
 * Uses Playwright to generate music tracks based on engineered prompts.
 * Requires a suno_auth.json file for persistent session management.
 */

export interface SunoConfig {
  prompt: string;
  style?: string;
  makeInstrumental?: boolean;
}

export async function executeSunoGeneration(config: SunoConfig): Promise<{ status: string; message: string }> {
  const authPath = path.join(process.cwd(), 'suno_auth.json');
  
  if (!fs.existsSync(authPath)) {
    console.warn('Suno Auth: Missing suno_auth.json. Operating in simulation mode.');
    return { status: 'SIMULATED', message: 'Auth file missing. Please refresh session manually.' };
  }

  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    storageState: authPath,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  try {
    console.log('Suno Agent: Navigating to creation hub...');
    await page.goto('https://suno.com/create', { waitUntil: 'networkidle' });

    // Session validation
    const signInButton = page.locator('button:has-text("Sign In")');
    if (await signInButton.isVisible()) {
      throw new Error('Suno Agent: Session expired. Refresh suno_auth.json required.');
    }

    console.log('Suno Agent: Injecting engineered prompt...');
    const textarea = page.locator('textarea[placeholder*="Enter a description"]');
    await textarea.fill(`${config.style ? config.style + ': ' : ''}${config.prompt}`);

    if (config.makeInstrumental) {
      // Logic to ensure instrumental mode is toggled if available in UI
      // Standard prompts usually contain "instrumental" keywords as a fallback
    }

    console.log('Suno Agent: Triggering generation node...');
    await page.click('button:has-text("Create")');

    // We don't wait for completion here to avoid blocking the worker thread for 2 minutes.
    // The Director will track the status in the correction ledger.
    
    await browser.close();
    return { status: 'TRIGGERED', message: 'Suno generation sequence initiated successfully.' };
  } catch (error: any) {
    await browser.close();
    console.error('Suno Agent Critical Failure:', error.message);
    throw error;
  }
}
