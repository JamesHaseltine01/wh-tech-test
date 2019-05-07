export class VegasHomePage {

    constructor (page, isMobileViewport) {
        this.page = page;
        this.baseUrl = 'https://vegas.williamhill.com/en-gb/';
        this.isMobileViewport = isMobileViewport;

        this.searchSelector = 'button[data-test="game-search-button"]';
        this.searchInputSelector = 'input[data-test="game-search-field"]';
    };

    async open() {
        await this.page.goto(this.baseUrl, {
            waitUntil: 'load'
        });
    };

    async search(searchText) {
        await this.page.waitForSelector(this.searchSelector);
        await this.page.click(this.searchSelector);

        await this.page.type(this.searchInputSelector, searchText);
        await this.page.waitFor(1000);
    };

    async hoverGame(gameName) {
        await this.page.hover(`.vegas-tile [alt="${gameName}"]`);
        await this.page.waitForSelector('button[data-test="tile-menu-button-more"]', {timeout: 10000});
    };

    async expandActiveGame() {
        await this.page.click('button[data-test="tile-menu-button-more"]');
    };

    async openGame() {
        await this.page.click('button[data-test="tile-details-button-play"]');
        await this.page.waitForSelector('button[data-test="tile-details-button-play"]');
    };
}