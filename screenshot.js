const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://www.reddit.com/r/islam/comments/18vbjse/concerned_about_the_validity_of_the_productive/');
  
  const post = await page.$('shreddit-post');
  const screenshotBuffer = await post.screenshot({ type: 'png' });
  
  require('fs').writeFileSync('reddit-post.png', screenshotBuffer);
  await browser.close();
})();
