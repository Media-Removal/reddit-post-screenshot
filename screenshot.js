const puppeteer = require('puppeteer');

(async () => {
  const url = process.env.POST_URL; // We'll set this in Render
  const output = "reddit_post.png";

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 1200 });
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('shreddit-post, .review', { timeout: 10000 });

  const post = await page.$('shreddit-post, .review');
  await post.screenshot({ path: output });

  console.log(`Screenshot saved: ${output}`);
  await browser.close();
})();
