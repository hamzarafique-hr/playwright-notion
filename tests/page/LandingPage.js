import { expect } from '@playwright/test';

export class LandingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getStartedButton = page.getByRole('link', { name: 'Get started' });
    this.logInButton = page.getByRole('link', { name: 'Log in' });
    this.googlePlayButton = page.locator('span').filter({ hasText: 'Google Play' }).first();
    this.startLearningButton = page.getByRole('link', { name: 'Start Learning Smarter' });

  }

  async verifyLandingPageLoaded() {
    await expect(this.getStartedButton).toBeVisible();
  }

  async clickLogin() {
    await this.logInButton.click();
  }

  async clickGetStarted() {
    await this.getStartedButton.click();
  }

  async clickStartLearning() {
    await this.startLearningButton.click();
  }
}