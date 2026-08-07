import { test, expect } from '@playwright/test';
import { LandingPage } from '../page/LandingPage.js';
import { RegistrationPage } from '../page/RegistrationPage.js';
import { LoginPage } from '../page/LoginPage.js';
import { getTestUser } from '../utils/testData.js';
import { HomePage } from '../page/HomePage.js';

test.describe('Sign-Up Flow', () => {
    test('SI-001: Verify navigate to login screen and observe elements', async ({ page }) => {

        const landingPage = new LandingPage(page);
        const loginPage = new LoginPage(page);

        await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/')

        await landingPage.clickLogin()
        await loginPage.verifyLoginPageLoaded();
    })

    test('SI-002: Verify user navigates to the signup screen from login screen', async ({ page }) => {
        const landingPage = new LandingPage(page);
        const loginPage = new LoginPage(page);
        const registrationPage = new RegistrationPage(page);

        await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/')

        await landingPage.clickLogin()
        await loginPage.verifyLoginPageLoaded();

        await loginPage.signupButton.click();
        await registrationPage.verifyRegistrationUIElements();
    });
    test('SI-003: Verify user navigates back and forth to the signup screen from login screen', async ({ page }) => {
        const landingPage = new LandingPage(page);
        const loginPage = new LoginPage(page);
        const registrationPage = new RegistrationPage(page);

        await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/')

        await landingPage.clickLogin()
        await loginPage.verifyLoginPageLoaded();

        await loginPage.signupButton.click();
        await registrationPage.verifyRegistrationUIElements();
        await page.goBack();
        await loginPage.verifyLoginPageLoaded();
        await page.goBack();
        await landingPage.verifyLandingPageLoaded();
    });
    test('SI-004: Verify user navigates back and forth to the forgot password screen', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registrationPage = new RegistrationPage(page);

        await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/login');
        await loginPage.verifyLoginPageLoaded();
        await loginPage.clickForgotPassword();
        await page.goBack();
        await loginPage.verifyLoginPageLoaded();
        // await page.pause();
    });

    test('SI-005: Verify user signin with invalid email', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registrationPage = new RegistrationPage(page);

        await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/login');
        await loginPage.verifyLoginPageLoaded();

        await loginPage.inputEmail.click();
        await loginPage.inputEmail.pressSequentially('hamzawork@gmail.com');
        await expect(loginPage.inputEmail).toHaveValue('hamzawork@gmail.com');

        await loginPage.inputPassword.click();
        await loginPage.inputPassword.pressSequentially('Hamza0000');
        // await expect(loginPage.inputEmail).toHaveValue('Hamza0000');

        await loginPage.loginButton.click();
        await expect(loginPage.incorrectEmailError).toBeVisible();
    });
    test('SI-006: Verify user signin with incorrect password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registrationPage = new RegistrationPage(page);

        await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/login');
        await loginPage.verifyLoginPageLoaded();

        await loginPage.inputEmail.click();
        await loginPage.inputEmail.pressSequentially('hamzawork9d@gmail.com');
        await expect(loginPage.inputEmail).toHaveValue('hamzawork9d@gmail.com');

        await loginPage.inputPassword.click();
        await loginPage.inputPassword.pressSequentially('Hamza000');
        // await expect(loginPage.inputEmail).toHaveValue('Hamza0000');

        await loginPage.loginButton.click();
        await expect(loginPage.incorrectEmailError).toBeVisible();
    });

    test('SI-007: Verify user signin with Dynamic credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registrationPage = new RegistrationPage(page);
        const testUser = getTestUser();
        const homePage = new HomePage(page);

        await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/login');
        await loginPage.verifyLoginPageLoaded();

        await loginPage.inputEmail.click();
        await loginPage.inputEmail.pressSequentially(testUser.email);
        await expect(loginPage.inputEmail).toHaveValue(testUser.email);

        await loginPage.inputPassword.click();
        await loginPage.inputPassword.pressSequentially(testUser.password);
        // await expect(loginPage.inputEmail).toHaveValue('Hamza0000');

        await loginPage.loginButton.click();
        await loginPage.page.waitForTimeout(15000);
        // await expect(loginPage.incorrectEmailError).toBeVisible();
        await expect(homePage.subHeading).toBeVisible();
        await homePage.page.waitForTimeout(5000);
    });

    test('SI-008: Verify user signin with Default Valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registrationPage = new RegistrationPage(page);
        const homePage = new HomePage(page);

        await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/login');
        await loginPage.verifyLoginPageLoaded();

        await loginPage.inputEmail.click();
        await loginPage.inputEmail.pressSequentially('hamzawork9d@gmail.com');
        await expect(loginPage.inputEmail).toHaveValue('hamzawork9d@gmail.com');

        await loginPage.inputPassword.click();
        await loginPage.inputPassword.pressSequentially('Hamza0000');
        // await expect(loginPage.inputEmail).toHaveValue('Hamza0000');

        await loginPage.loginButton.click();
        await loginPage.page.waitForTimeout(15000);
        // await expect(loginPage.incorrectEmailError).toBeVisible();
        await expect(homePage.subHeading).toBeVisible();
        await homePage.page.waitForTimeout(5000);
    });






});
