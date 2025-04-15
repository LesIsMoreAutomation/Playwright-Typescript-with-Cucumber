import { Given, When, Then } from "@cucumber/cucumber";
import { getPage } from "../config/global-setup";
import { InventoryPage } from "../page-objects/products-Page/InventoryPage";
Then("I click on the {string}", async function (text) {
    const page = getPage(this);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.clickByText(text);
    await page.screenshot({ path: 'test-report/screenshot.png' });
});
Then("the user should see {int} items in the cart", async function (itemCount) {
    const page = getPage(this);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyCartItemCount(itemCount);
});
When("the user filters items by pricing", async function () {
    const page = getPage(this);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.filterItemsByPricing();
});
Then("the user should see the first item as the lowest and the last item as the highest in price", async function () {
    const page = getPage(this);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyPriceOrder();
});
