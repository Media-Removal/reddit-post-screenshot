const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser', // Render’s headless chromium path
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1200 });
  await page.goto('https://www.reddit.com/r/islam/comments/18vbjse/concerned_about_the_validity_of_the_productive/', { waitUntil: 'networkidle2' });

  // Wait for the main post container
  const post = await page.$('shreddit-post');
  if (!post) {
    console.log('Main post not found!');
  }

  // Screenshot the main post only
  await post.screenshot({ path: 'main_post.png' });
  console.log('Screenshot saved as main_post.png');

  await browser.close();
})();
