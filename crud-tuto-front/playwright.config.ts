// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory of your test files
  timeout: 30000, // Timeout for each test in milliseconds
  reporter: [
    ['list'], // Default list reporter for console output
    ['html', { outputFolder: 'playwright-report' }], // HTML reporter
    ['junit', { outputFile: 'results.xml' }], // JUnit reporter
    ['json', { outputFile: 'report.json' }] // JSON reporter
  ],
  use: {
    headless: true, // Run tests in headless mode by default
    screenshot: 'on', // Capture screenshots on failure
    video: 'retain-on-failure', // Capture video on failure
  },
});
