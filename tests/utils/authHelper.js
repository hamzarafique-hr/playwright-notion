import { expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage.js';
import { HomePage } from '../page/HomePage.js';

const LOGIN_URL = 'https://synapse-web-v2-poc.quadrupleapps.com/login';
const TEST_USER = { email: 'hamzawork9d@gmail.com', password: 'Hamza0000' };

export async function loginToApp(page, userCredentials = null) {
    const credentials = userCredentials || TEST_USER;
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await page.goto(LOGIN_URL);
    await loginPage.login({ email: credentials.email, password: credentials.password });

    await expect(homePage.subHeading).toBeVisible();
    // await page.waitForTimeout(5000);

    if (await homePage.captureIdeasDialog.isVisible()) {
        await homePage.closeDialog();
    }

    await expect(homePage.subHeading).toBeVisible();
    return { loginPage, homePage, credentials };
}
