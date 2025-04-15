import { Given, When, Then } from "@cucumber/cucumber";
import { page, baseBage } from "../config/global-setup";

Then("I click on the {string}", async function (text) {
    await basePage.InventoryPage.clickByText(text);
    await page.screenshot({ path: 'test-report/screenshot.png' })
});

Then("the user should see {int} items in the cart", async function (text) {
    await basePage.InventoryPage.verifyCartItemCount(text);
});
When("the user filters items by pricing", async function () {
    await basePage.InventoryPage.filterItemsByPricing()
});
Then("the user should see the first item as the lowest and the last item as the highest in price", async function () {
    await basePage.InventoryPage.verifyPriceOrder();

});
