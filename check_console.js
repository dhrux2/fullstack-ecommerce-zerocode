const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));
  
  await page.goto('http://localhost:3000');
  
  // wait a bit for hydration
  await page.waitForTimeout(2000);
  
  const bodyStyles = await page.evaluate(() => {
    return {
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      bodyColor: window.getComputedStyle(document.body).color,
      mainClasses: document.querySelector('main')?.className,
      h1Visible: !!document.querySelector('h1'),
      h1Text: document.querySelector('h1')?.innerText
    };
  });
  
  console.log(bodyStyles);
  
  await browser.close();
})();
