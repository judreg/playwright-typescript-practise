import { Page } from "playwright";
import { InventoryPageSelectors } from "../selectors/saucedemo.selectors";
import { BasePage } from "./basePage";

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page, "https://www.saucedemo.com/inventory.html");
  }

  async visit(): Promise<void> {
    await this.page.goto(this.url);
  }

  async addItemToCart(item: "backpack" | "fleeceJacket"): Promise<void> {
    const selector = InventoryPageSelectors.addToCartButton[item];
    await this.page.click(selector);
  }

  async getNumberOfItemsInCart(): Promise<number> {
    const text: string | null = await this.page.textContent(
      InventoryPageSelectors.shoppingCartBadge
    );
    return text ? parseInt(text, 10) : 0;
  }

  async goToShoppingCart(): Promise<void> {
    await this.page.click(InventoryPageSelectors.shoppingCartContainer);
  }
}
