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
    this.footer = page.getByText('Made with ♥ by Imagination AI');
    this.whyVivloOption = page.getByRole('link', { name: 'Why vivlo' });
    this.whyVivloSection = page.getByRole('heading', { name: 'Your best ideas get lostbetween a dozen apps' });
    this.captureOption = page.getByRole('link', { name: 'Capture' });
    this.captureSection = page.getByRole('heading', { name: 'Capture it howeverit comes to you' });
    this.viviOption = page.getByRole('link', { name: 'Meet vivi' });
    this.viviSection = page.getByRole('heading', { name: 'Ask vivi anything,any time' });
    this.howItWorksOption = page.locator('a').filter({ hasText: 'How it works' }).first();
    this.howItWorksSection = page.getByRole('heading', { name: 'Capture. Connect.Comprehend. Recall.' })
    this.useCasesOption = page.locator('a').filter({ hasText: 'Use cases' }).first();
    this.useCasesSection = page.getByRole('heading', { name: 'However you learn,vivlo keeps up' });
    this.blogOption = page.getByRole('link', { name: 'Blog' });
    this.blogSectionHeading = page.getByRole('heading', { name: 'Blog' });

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

  async verifyWhyVivloSectionShown() {
    await expect(this.whyVivloOption).toBeVisible();
    await this.whyVivloOption.click()
    await expect(this.whyVivloSection).toBeVisible();
  }

  async verifyCaptureSectionShown() {
    await expect(this.captureOption).toBeVisible();
    await this.captureOption.click()
    await expect(this.captureSection).toBeVisible();
  }

  async verifyMeetViviSectionShown() {
    await expect(this.viviOption).toBeVisible();
    await this.viviOption.click()
    await expect(this.viviSection).toBeVisible();
  }

  async verifyHowWorksSectionShown() {
    await expect(this.howItWorksOption).toBeVisible();
    await this.howItWorksOption.click()
    await expect(this.howItWorksSection).toBeVisible();
  }

  async verifyUseCasesSectionShown() {
    await expect(this.useCasesOption).toBeVisible();
    await this.useCasesOption.click()
    await expect(this.useCasesSection).toBeVisible();
  }

  async verifyBlogSectionShown() {
    await expect(this.blogOption).toBeVisible();
    await this.blogOption.click()
    await expect(this.blogSectionHeading).toBeVisible();
  }
}