export const LoginPageSelectors = {
  loginButton: "[data-test=login-button]",
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
};

export const InventoryPageSelectors = {
  addToCartButton: {
    backpack: '[data-test="add-to-cart-sauce-labs-backpack"]',
    fleeceJacket: '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
  },
  shoppingCartBadge: ".shopping_cart_badge",
  shoppingCartContainer: ".shopping_cart_container",
  footerCopy: ".footer_copy",
};

export const CartPageSelectors = {
  checkoutButton: '[data-test="checkout"]',
};

export const CheckoutStepOneSelectors = {
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  zipCodeInput: '[data-test="postalCode"]',
  continueButton: "[data-test=continue]",
};

export const CheckoutStepTwoSelectors = {
  finishButton: "[data-test=finish]",
};
