import { expect, Page } from "@playwright/test";

export class LoginPage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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

  public async isUserLoggedIn() {
    await expect(this.page).toHaveTitle("Swag Labs");
  }
  public async clickByText(text: string){
    await this.page.getByText(text).click()
  }
}
