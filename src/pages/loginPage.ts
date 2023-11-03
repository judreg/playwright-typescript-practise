import { Page } from "playwright";
import { LoginPageSelectors } from "../selectors/saucedemo.selectors";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, "https://www.saucedemo.com");
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(LoginPageSelectors.usernameInput, username);
    await this.page.fill(LoginPageSelectors.passwordInput, password);
    await this.page.click(LoginPageSelectors.loginButton);
  }
}
