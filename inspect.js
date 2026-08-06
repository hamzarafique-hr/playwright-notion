const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');

  await page.waitForTimeout(3000);

  // Test specific CSS selector
  const count1 = await page.locator('div.flex.items-center.gap-1\\.5.text-xs:has-text("At least 1 uppercase")').count();
  console.log('Specific div count:', count1);

  const svgCount = await page.locator('div.flex.items-center.gap-1\\.5.text-xs:has-text("At least 1 uppercase")').locator('svg.lucide-circle').count();
  console.log('SVG circle count inside specific div:', svgCount);

  await browser.close();
})();
