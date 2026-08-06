import { expect } from '@playwright/test';

export class RegistrationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.header = page.getByRole('heading', { name: 'Create your account' });
    this.googleLoginButton = page.getByRole('button', { name: 'Login with Google' });
    this.nameInput = page.getByPlaceholder('Your full name');
    this.emailInput = page.getByPlaceholder('you@example.com');
    this.passwordInput = page.getByTestId('register-password');
    this.confirmPasswordInput = page.getByTestId('register-confirm');
    this.termsLink = page.getByRole('link', { name: 'Terms & Conditions' });
    this.privacyLink = page.getByRole('link', { name: 'Privacy Policy' });
    this.signUpButton = page.getByRole('button', { name: 'Sign Up' });

    // Validation Error Locators
    this.emailInvalidError = page.getByText('Please enter a valid email address (e.g. you@example.com).', { exact: true });
    this.confirmPasswordError = page.getByText('The password and confirm password do not match.', { exact: true });
    this.passwordMatch = page.getByText('Passwords match.', { exact: true });

    // Password indicator Locators
    this.uppercaseIndicator = page.locator("//div[1]//span[1]");
    this.numberIndicator = page.locator('div.flex.items-center.gap-1\.5.text-xs').locator('span').nth(0);
    this.lengthIndicator = page.locator("//div[@class='flex flex-col gap-1 mt-1']//div[3]//span[1]//*[name()='svg']");


    this.uppercaseRequirement = page.locator('div.flex.items-center.gap-1\\.5.text-xs:has-text("At least 1 uppercase")');

    this.numberRequirement = page.locator('div.flex.items-center.gap-1\\.5.text-xs:has-text("At least 1 number")');

    this.lengthRequirement = page.locator('div.flex.items-center.gap-1\\.5.text-xs:has-text("At least 8 characters")');
  }

  async verifyRegistrationUIElements() {
    await expect(this.header).toBeVisible();
    await expect(this.googleLoginButton).toBeVisible();
    await expect(this.nameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.termsLink).toBeVisible();
    await expect(this.privacyLink).toBeVisible();
    await expect(this.signUpButton).toBeVisible();
  }

  // async fillForm(name, email, password, confirmPassword) {
  //   await this.nameInput.fill(name);
  //   await this.emailInput.fill(email);
  //   await this.passwordInput.fill(password);
  //   await this.confirmPasswordInput.fill(confirmPassword);
  // }

  async fillForm(name, email, password, confirmPassword) {
    await this.nameInput.click();
    await this.nameInput.pressSequentially(name, { delay: 50 });
    await this.nameInput.press('Tab');

    await this.emailInput.click();
    await this.emailInput.pressSequentially(email, { delay: 50 });
    await this.emailInput.press('Tab');

    await this.passwordInput.click();
    await this.passwordInput.pressSequentially(password, { delay: 180 });
    await this.passwordInput.press('Tab');

    await this.confirmPasswordInput.click();
    await this.confirmPasswordInput.pressSequentially(confirmPassword, { delay: 180 });
    await this.confirmPasswordInput.press('Tab');
    await this.confirmPasswordInput.blur();
  }

  async removeFocus() {
    await this.header.click();
  }

  async clearNameField() {
    await this.nameInput.clear();
  }

  async clearEmailField() {
    await this.emailInput.clear();
  }

  async verifySignUpButtonDisabled() {
    await expect(this.signUpButton).toBeDisabled();
  }





  async clickSignUp() {
    await expect(this.signUpButton).toBeEnabled();
    await this.signUpButton.click();
  }

  async expectRequirementNotMet(requirement) {
    await expect(requirement.locator('svg.lucide-circle')).toBeVisible();
    await expect(requirement.locator('svg.lucide-check')).toHaveCount(0);
  }

  async expectRequirementMet(requirement) {
    await expect(requirement.locator('svg.lucide-check')).toBeVisible();
    await expect(requirement.locator('svg.lucide-circle')).toHaveCount(0);
  }

}