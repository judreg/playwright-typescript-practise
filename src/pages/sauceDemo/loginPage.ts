import { Page } from "playwright";
import { LoginPageSelectors } from "../../selectors/saucedemo.selectors";
import { BasePage } from "../basePage";
import { sauceDemoBaseURL } from "../../../config";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, sauceDemoBaseURL);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(LoginPageSelectors.usernameInput, username);
    await this.page.fill(LoginPageSelectors.passwordInput, password);
    await this.clickOnLoginButton();
  }

  async clickOnLoginButton(): Promise<void> {
    await this.page.click(LoginPageSelectors.loginButton);
  }
}
