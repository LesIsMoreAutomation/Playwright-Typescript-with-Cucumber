import { expect, Page } from "@playwright/test";

export class SportPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async clickByRole(text: string) {
        await this.page.getByRole('link', { name: text }).first().click();
    }

    public async getNameAtPosition(position: number): Promise<string> {
        const selector = `div#main-data section:nth-child(2) > div > div > div:nth-child(1) > table > tbody > tr:nth-child(${position}) > td:nth-child(2) > div > div > div.ssrcss-1aurqtj-DriverCellWrapper.e1dzfgvv6 > span.ssrcss-1hf3wfc-FullName.e1dzfgvv4`;

        // Get the element
        const element = await this.page.$(selector);

        if (element) {
            // Get the text content of the element
            const textContent = await element.textContent();
            return textContent?.trim() || ''; // Return the text or an empty string if not found
        } else {
            throw new Error(`Element not found at position ${position}`);
        }
    }
    public async enterPlaceholderInput(val: string) {
        await this.page.getByRole("link", { name: "Search BBC" }).click();
        await this.page.getByPlaceholder("Search the BBC").fill(val);
        await this.page.click("#searchButton")
    }
}
