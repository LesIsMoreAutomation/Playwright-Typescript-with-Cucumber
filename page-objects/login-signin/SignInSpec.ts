import { expect, Page } from "@playwright/test";
import {page} from "../../config/global-setup";

export class SignInSpec {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async enterEmail(email: string) {
        await this.page.getByPlaceholder("Email").fill(email);
    }

    public async enterPassword(password: string) {
        await this.page.getByPlaceholder("Password").fill(password);
    }

    public async clickOnSignIn() {
        await this.page.locator("button[type='submit']").click();
    }

    public async AssertSignInPage(selector: string, text: string) {
        await expect(page.locator(selector)).toHaveText(text);
    }

}
