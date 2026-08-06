import { test, expect } from '@playwright/test';
import { HomePage } from '../page/HomePage.js';
import { loginToApp } from '../utils/authHelper.js';
import { LoginPage } from '../page/LoginPage.js';


test.describe('Homescreen flows' ,() => {
    test('Verify user flow from logIn to LogOut' , async({ page }) => {
        const homePage = new HomePage(page);
        const logIn = new LoginPage(page);

        await loginToApp(page);
        await expect(homePage.accountBtn).toBeVisible();
        await homePage.accountBtn.click();
        await expect(homePage.logoutBtn).toBeVisible();
        await homePage.logoutBtn.click();
        await expect(logIn.header).toBeVisible();
    })
});


