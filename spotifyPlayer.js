'use strict';
const PLAYLIST = 'https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn';
const SPOTIFY_USERNAME = "chengguo0719@outlook.com";
const SPOTIFY_PASSWORD = "idragonit20151001";
const WINDOW_WIDTH = 1920;
const WINDOW_HEIGHT = 1080;
const TIMEOUT = 30000;
const puppeteer = require('puppeteer-extra');
puppeteer.use(require('puppeteer-extra-plugin-flash')());
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const USERAGENT = 'Mozilla/5.0 (Hackintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36';
const LOGIN_PAGE = 'https://accounts.spotify.com';
puppeteer.use(pluginStealth());

const args = [
  '--window-position=0,0',
  '--user-agent=' + USERAGENT,
  '--window-size=' + WINDOW_WIDTH + ',' + WINDOW_HEIGHT,
  '--disable-infobars',
  '--no-sandbox'
];

const options = {
  args,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true, // SET THIS TO TRUE ON PRODUCTION
  slowMo: 10, // slow down
  ignoreDefaultArgs: "--hide-scrollbars"
};

try {
  (async () => {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setViewport({width: WINDOW_WIDTH, height: WINDOW_HEIGHT});
    try {
      //
      await page.goto(LOGIN_PAGE, {timeout: TIMEOUT});
      const siteTitle = await page.title();
      await page.waitForSelector('input#login-username', {timeout: TIMEOUT});
      await page.type('input#login-username', SPOTIFY_USERNAME);
      //
      console.log('Filling password');
      await page.waitForSelector('input#login-password');
      await page.type('input#login-password', SPOTIFY_PASSWORD);

      console.log('Login...');
      await page.click('button#login-button');
      var loggedIn = 'a#account-settings-link';
      try {
        await page.waitForSelector(loggedIn, {timeout: 10000});
        console.log('Logged in');
      } catch (e) {
        console.log('Login Failed...');
        browser.close();
        process.exit(403);
      }
      console.log('Loading playlist');
      await page.goto(PLAYLIST, {waitUntil: 'domcontentloaded', timeout: TIMEOUT});
      // DO A SCREESHOT OF WHAT'S HAPPENING
      await page.screenshot({path: 'storage/playlist.png'});
      //
      console.log('Lets play the music...');
      await page.click('button.btn-green');

    } catch (err) {
      console.log(err.message);
      await page.screenshot({path: 'storage/spotify.png'});
      process.exit();
    }
  })()
} catch (err) {
  page.screenshot({path: 'storage/spotify-error.png'});
  console.log(err.message);
  process.exit();
}
