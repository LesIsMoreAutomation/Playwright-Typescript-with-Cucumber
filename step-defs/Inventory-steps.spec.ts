import { Given, When, Then } from "@cucumber/cucumber";
import { page, getPage } from "../config/global-setup";

Then("I click on the {string}", async function (text) {
    await getPage.InventoryPage.clickByText(text);
    await page.screenshot({ path: 'test-report/screenshot.png' })
});

Then("the user should see {int} items in the cart", async function (text) {
    await getPage.InventoryPage.verifyCartItemCount(text);
});
When("the user filters items by pricing", async function () {
    await getPage.InventoryPage.filterItemsByPricing()
});
Then("the user should see the first item as the lowest and the last item as the highest in price", async function () {
    await getPage.InventoryPage.verifyPriceOrder();

});
