import { Given, When, Then } from "@cucumber/cucumber";
import {page, baseBage} from "../config/global-setup";


Given
("I navigate to ultimate automation website {string}", async function (env) {
    await page.goto("https://courses.ultimate"+env+".com/users/sign_in");
});

Then
("Assert sign in page has header {string}", async function (header) {
    await baseBage.SignInSpec.AssertSignInPage(".page__heading",header);
});

When("I enter the email {string}", async function (username) {
    await baseBage.SignInSpec.enterEmail(username);
});

When("I enter the password {string}", async function (password) {
    await baseBage.SignInSpec.enterPassword(password);
});

Then("I click on the sign in button", async function () {
    await baseBage.SignInSpec.clickOnSignIn();
});





