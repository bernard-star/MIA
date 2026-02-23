import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('LOG:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message, err.stack));

    // goto the live local server
    await page.goto('http://localhost:5173/');

    // wait and dump all errors
    await new Promise(resolve => setTimeout(resolve, 3000));

    await browser.close();
})();
