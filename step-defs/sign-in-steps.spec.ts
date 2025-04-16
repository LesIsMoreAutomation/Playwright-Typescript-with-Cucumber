import { Given, When, Then } from "@cucumber/cucumber";
import {page, basePage} from "../config/global-setup";




Then
("Assert sign in page has header {string}", async function (header) {
    await basePage.SignInSpec.AssertSignInPage(".page__heading",header);
});

When("I enter the email {string}", async function (username) {
    await basePage.SignInSpec.enterEmail(username);
});

When("I enter the password {string}", async function (password) {
    await basePage.SignInSpec.enterPassword(password);
});

Then("I click on the sign in button", async function () {
    await basePage.SignInSpec.clickOnSignIn();
});





