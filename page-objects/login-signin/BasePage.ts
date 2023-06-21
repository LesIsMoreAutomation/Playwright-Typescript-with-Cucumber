import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import {SignInSpec} from "./SignInSpec";
import {InventoryPage} from "../products-Page/InventoryPage";
export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public get LoginPage(): LoginPage {
    return new LoginPage(this.page);
  }
  public get SignInSpec(): SignInSpec {
    return new SignInSpec(this.page);
  }
  public get InventoryPage(): InventoryPage {
    return new InventoryPage(this.page);
  }
}
