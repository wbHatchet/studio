const { chromium } = require('playwright');
const path = require('path');

/**
 * Phase A: Manual Session Acquisition
 * Run this script to log in manually and save your session state.
 * Usage: node scripts/save_suno_session.js
 */
async function saveSunoSession() {
  const authPath = path.join(process.cwd(), 'suno_auth.json');
  console.log("--- Suno Session Acquisition Protocol ---");
  
  const browser = await chromium.launch({ headless: false }); // Headed for manual login
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://suno.com/create');
  
  console.log("WAITING: Please log in manually in the browser window...");
  console.log("Protocol will save state once 'Create' button is detected.");

  // Detect login success
  try {
    await page.waitForSelector('button:has-text("Create")', { timeout: 0 });
    console.log("SUCCESS: Login detected.");
    
    await context.storageState({ path: authPath });
    console.log(`SESSION SAVED: ${authPath}`);
    console.log("You can now run the pipeline in headless mode.");
  } catch (err) {
    console.error("Protocol Failed:", err.message);
  } finally {
    await browser.close();
  }
}

saveSunoSession();
