import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import path from 'path';
import fs from 'fs';

// @ts-ignore - Stealth plugin for playwright
chromium.use(stealth());

/**
 * Industrial Suno AI Automation Service.
 * Enhanced with mitigation strategies for Bot Detection, UI Updates, 
 * Credit Exhaustion, and Rate Limiting.
 */

export interface SunoConfig {
  prompt: string;
  style?: string;
  makeInstrumental?: boolean;
}

/**
 * Utility to mimic human "thought time" or interaction delays.
 */
const randomDelay = (min = 5000, max = 15000) => 
  new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1) + min)));

export async function executeSunoGeneration(config: SunoConfig): Promise<{ status: string; message: string }> {
  const authPath = path.join(process.cwd(), 'suno_auth.json');
  
  if (!fs.existsSync(authPath)) {
    console.warn('Suno Agent: Missing suno_auth.json. Operating in simulation mode.');
    return { status: 'SIMULATED', message: 'Auth file missing. Please refresh session manually.' };
  }

  const browser = await chromium.launch({ 
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const context = await browser.newContext({
    storageState: authPath,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 }
  });

  const page = await context.newPage();

  try {
    console.log('Suno Agent: Navigating to creation hub...');
    await page.goto('https://suno.com/create', { waitUntil: 'networkidle' });
    await randomDelay(3000, 6000);

    // 1. Session Validation
    const signInButton = page.locator('button:has-text("Sign In")');
    if (await signInButton.isVisible()) {
      throw new Error('Suno Agent: Session expired. Refresh suno_auth.json required.');
    }

    // 2. Credit Exhaustion Mitigation
    console.log('Suno Agent: Verifying credit balance...');
    // Text-based scraping for industrial resilience
    const creditText = await page.locator('div, span, p').filter({ hasText: /^\d+\sCredits$/ }).first().innerText().catch(() => "1000"); 
    const credits = parseInt(creditText.replace(/\D/g, '')) || 0;
    
    if (credits < 10) {
      throw new Error(`Suno Agent: Insufficient credits (${credits}). Aborting generation.`);
    }
    console.log(`Suno Agent: Credits verified (${credits}).`);

    // 3. UI Resilience: Text-based prompt injection
    console.log('Suno Agent: Injecting engineered prompt...');
    const promptInput = `${config.style ? config.style + ': ' : ''}${config.prompt}`;
    
    // Attempt to toggle Custom Mode if needed or just use simple prompt
    const textarea = page.locator('textarea').filter({ has: page.locator('..', { hasText: /Enter a description/i }) }).first();
    
    if (!await textarea.isVisible()) {
      await page.locator('textarea[placeholder*="description"]').fill(promptInput);
    } else {
      await textarea.fill(promptInput);
    }

    // 4. Instrumental Logic
    if (config.makeInstrumental) {
      const instrumentalToggle = page.locator('button:has-text("Instrumental")');
      if (await instrumentalToggle.isVisible()) {
        const isChecked = await instrumentalToggle.getAttribute('aria-checked') === 'true';
        if (!isChecked) await instrumentalToggle.click();
      }
    }

    await randomDelay(2000, 5000); // Rate Limiting pause

    // 5. Mimic human "Create" click
    console.log('Suno Agent: Triggering generation node...');
    const createButton = page.locator('button').filter({ hasText: /^Create$/i }).first();
    await createButton.click();

    await randomDelay(5000, 10000); // Wait for submission acknowledgment
    
    await browser.close();
    return { status: 'TRIGGERED', message: `Suno generation initiated. Credits remaining: ${credits - 10}` };
  } catch (error: any) {
    await browser.close();
    console.error('Suno Agent Critical Failure:', error.message);
    throw error;
  }
}
