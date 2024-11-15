import { expect, Page } from "@playwright/test";
import { urls } from "../../utils/env.urls";

export class LoginPage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLoginPage(environment: string): Promise<void> {
    const loginUrl = urls[environment];
    await this.page.goto(loginUrl, { timeout: 90000 });
  }
  public async enterUsername(username: string) {
    await this.page.getByPlaceholder("Username").fill(username);
  }

  public async enterPassword(password: string) {
    await this.page.getByPlaceholder("Password").fill(password);
  }

  public async clickOnLogin() {
    await this.page.getByText("Login").click();
  }
  public async lockoutError(text: string){
    await expect(this.page.locator(".error-message-container.error")).toContainText(text);
  }

}
