import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = 'file://' + path.join(__dirname, 'tutorial-3-pasos.html');

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1200, height: 2000 }, deviceScaleFactor: 1 });
const page = await context.newPage();
await page.goto(htmlPath, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

const sheets = await page.$$('.sheet');
const names = ['tutorial-1080x1920.png', 'tutorial-1080x1080.png'];
for (let i = 0; i < sheets.length; i++) {
  const out = path.join(__dirname, names[i]);
  await sheets[i].screenshot({ path: out, omitBackground: false });
  console.log('Saved:', out);
}
await browser.close();
