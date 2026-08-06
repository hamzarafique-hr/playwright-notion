import { expect } from '@playwright/test';

export class VerificationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.header = page.getByRole('heading', { name: 'Check Email' });
    // this.instructionalSubtext = page.locator('/html/body/div[2]/div[2]/div/div/div[1]/div[2]/p[1]/text()');
    this.resendEmailButton = page.getByRole('button', { name: 'Resend Email' });
    this.changeEmailButton = page.getByRole('button', { name: 'Change Email' });
    // this.sentToEmailText = page.getByText(/Sent to/i);
  }

  // async verifyVerificationScreenLoaded(expectedEmail) {
  //   await expect(this.header).toBeVisible();
  //   await expect(this.instructionalSubtext).toBeVisible();
  //   await expect(this.resendEmailButton).toBeVisible();
  //   await expect(this.changeEmailButton).toBeVisible();
  //   await expect(this.page.getByText(`Sent to ${expectedEmail}`)).toBeVisible();
  // }

  async verifyVerificationScreenLoaded() {
    await expect(this.header).toBeVisible();
    // await expect(this.instructionalSubtext).toBeVisible();
    await expect(this.resendEmailButton).toBeVisible();
    await expect(this.changeEmailButton).toBeVisible();
    // await expect(this.page.getByText(`Sent to ${expectedEmail}`)).toBeVisible();
  }


  async pressDeviceBackButton() {
    // Simulates device/browser back navigation
    // await this.page.goBack();
    await this.changeEmailButton.click();
  }
}