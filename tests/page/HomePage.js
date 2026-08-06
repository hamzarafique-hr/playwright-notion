import { expect } from "@playwright/test";

export class HomePage {
    /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page

    // Locators
    this.subHeading = page.getByText('Get Started');
    this.accountBtn = page.getByText('T', { exact: true });
    this.accountSettings = page.getByText('Account Settings', { exact: true });
    this.logoutBtn = page.getByText('Logout', { exact: true });
    this.captureIdeasDialog = page.getByText('Capture Ideas Instantly');
    this.firstNextBtn = page.getByRole('button', { name: 'Next' });
    this.chatViviDialog = page.getByText('Chat with vivi');
    this.backDialogBtn = page.getByRole('button', { name: 'Back' });
    this.doneDialogBtn = page.getByRole('button', { name: 'Done' });
    this.iapDialog = page.getByRole('heading', { name: 'Choose your plan' });
    this.closeIAPDialog = page.locator("//button[@aria-label='Close']//*[name()='svg']");
  }

  async closeDialog() {
    await expect(this.captureIdeasDialog).toBeVisible();
    await expect(this.firstNextBtn).toBeVisible();
    await this.firstNextBtn.click();
    await expect(this.chatViviDialog).toBeVisible();
    await expect(this.doneDialogBtn).toBeVisible();
    await this.doneDialogBtn.click();
    await expect(this.iapDialog).toBeVisible();
    await this.closeIAPDialog.click();
  }

  
}