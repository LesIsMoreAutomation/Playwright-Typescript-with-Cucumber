import {expect, Page} from "@playwright/test";

export class InventoryPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async clickByText(text: string){
        await this.page.getByText(text).first().click()
    }

    public async pageTitle() {
        await expect(this.page).toHaveTitle("Swag Labs");
    }


    async verifyCartItemCount(expectedCount: number): Promise<void> {
        const cartItemCount = await this.page.innerText(".shopping_cart_badge");
        expect(parseInt(cartItemCount)).toBe(expectedCount);
    }

    async filterItemsByPricing(): Promise<void> {
        await this.page.selectOption(".product_sort_container", "lohi");
        await this.page.waitForLoadState();
    }

    async verifyPriceOrder(): Promise<void> {
        const priceElements = await this.page.$$(".inventory_item_price");
        const prices = await Promise.all(priceElements.map((element) => element.innerText()));

        for (let i = 0; i < prices.length - 1; i++) {
            const currentPrice = parseFloat(prices[i].replace("$", ""));
            const nextPrice = parseFloat(prices[i + 1].replace("$", ""));
            expect(currentPrice).toBeLessThanOrEqual(nextPrice);
        }
    }

}
