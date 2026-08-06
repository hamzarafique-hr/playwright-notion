import { expect } from "@playwright/test";

export class LoginPage {
    /**
    * @param {import('@playwright/test').Page} page
    */
  constructor(page) {
    this.page = page;

    // Locators
    this.header = page.getByRole('heading', { name: 'Login to vivlo' });
    this.inputEmail = page.getByRole('textbox', { name: 'Enter your email' });
    this.inputPassword = page.getByPlaceholder('Enter password');
    this.loginButton = page.getByText('Login', { exact: true });
    this.forgotPassword = page.getByRole('button', { name: 'Forgot Password?' });
    this.signupButton = page.getByRole('link', { name: 'Sign Up' });
    this.headerForgot = page.getByRole('heading', { name: 'Forgot Password' });

    // Validation Error Locators
    this.incorrectEmailError = page.getByText('Incorrect email or password. Please try again.', { exact: true });
  }
    // Actions 
  async verifyLoginPageLoaded() {
    await expect(this.header).toBeVisible();
    await expect(this.inputEmail).toBeVisible();
    await expect(this.inputPassword).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async clickForgotPassword() {
    await this.forgotPassword.click();
    // await expect(this.headerForgot).toBeVisible();
  }

  async invalidEmailLogin() {

  }

  async login({ email, password }) {
    await this.verifyLoginPageLoaded();

    await this.inputEmail.click();
    await this.inputEmail.pressSequentially(email);
    await expect(this.inputEmail).toHaveValue(email);

    await this.inputPassword.click();
    await this.inputPassword.pressSequentially(password);

    await this.loginButton.click();
    await this.page.waitForTimeout(15000);
  }
}
