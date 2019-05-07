import puppeteer  from 'puppeteer';
import 'babel-polyfill';
import { VegasHomePage } from '../support/pages/vegasHome.page.js';

const testTypes = [
    ['Desktop', false, 1280, 800],
    ['iPhone X', true, 375, 812]
];
describe.each(testTypes)('Search and launch Mayfair Roulette - %s', (testTitle, isMobile, width, height) => {
    let browser;
    let page;
    let vegasHomePage;

    beforeAll(async () => {
         browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1040','--no-sandbox']});
         page = await browser.newPage();

        await page.setViewport({ width: width, height: height });
    });

    afterAll(async () => {
        await browser.close();
    });

    test('I go to the William Hill Vegas', async (done) => {
        vegasHomePage = new VegasHomePage(page, isMobile);
        await vegasHomePage.open()

        await page.waitForSelector('.app',{timeout:10000});
        const williamHillAppLoaded = await page.$('.application');
        
        expect(williamHillAppLoaded).toBeTruthy();
        done();
    });

    test('I search for a game', async (done) => {
        await vegasHomePage.search('Mayfair Roulette');

        const mayfairRouletteTilePresent = await page.$('.vegas-tile [alt="Mayfair Roulette"]');
        expect(mayfairRouletteTilePresent).toBeTruthy();
        done();
    });

    test('I hover over the selected game, then click more', async (done) => {
        await vegasHomePage.hoverGame('Mayfair Roulette');
        await vegasHomePage.expandActiveGame();

        done();
    });

    test('I click play now on the selected game', async(done) => {
        await vegasHomePage.openGame();
        
        const isLogInModalPresent = await page.$('.login-component__wrapper', {timeout:5000});

        expect(isLogInModalPresent).toBeTruthy();
        done();
    });
});