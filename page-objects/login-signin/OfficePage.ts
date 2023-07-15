import { expect, Page } from "@playwright/test";
import { urls } from "../../utils/env.urls";

export class OfficePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToLoginPage(environment: string): Promise<void> {
        const loginUrl = urls[environment];
        await this.page.goto(loginUrl);
    }
    public async enterUsername(username: string) {
        await this.page.getByPlaceholder("Email, phone, or Skype").fill(username);
    }

    public async enterPassword(password: string) {
        await this.page.getByPlaceholder("Password").fill(password);
    }

    public async clickOnText(text: string) {
        await this.page.getByText(text).first().click();
    }


}
