import { test, expect } from '@playwright/test';
import { LandingPage } from '../page/LandingPage.js';
import { RegistrationPage } from '../page/RegistrationPage.js';
import { VerificationPage } from '../page/VerificationPage.js';
import { generateTestUser } from '../utils/testData.js';

test.describe('Sign-Up Flow', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/');
    console.log('Starting Sign-Up Flow Suite');
  });

  test('SU-J001: Complete sign-up happy path and verify pending screen', async ({ page }) => {
    // Page Objects initialization
    const landingPage = new LandingPage(page);
    const registrationPage = new RegistrationPage(page);
    const verificationPage = new VerificationPage(page);

    const testUser = generateTestUser();

    // Step 1 & 2: Launch app and wait for landing screen to load
    // await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/');
    await landingPage.verifyLandingPageLoaded();

    // Step 3 & 4: Tap "Get started" button and wait for registration screen
    await landingPage.clickGetStarted();
    await registrationPage.verifyRegistrationUIElements();

    // Step 5 - 8: Fill out registration details & verify populated values
    await registrationPage.fillForm(
      testUser.name,
      testUser.email,
      testUser.password,
      testUser.confirmPassword,
    );

    await expect(registrationPage.nameInput).toHaveValue(testUser.name);
    await expect(registrationPage.emailInput).toHaveValue(testUser.email);
    await expect(registrationPage.passwordInput).toHaveValue(testUser.password);
    await expect(registrationPage.confirmPasswordInput).toHaveValue(testUser.confirmPassword);

    // Step 9: Tap "Sign Up" button
    await registrationPage.clickSignUp();
    await registrationPage.page.waitForTimeout(20000)

    // Step 10: Wait for verification screen to load and verify elements
    // await page.waitForTimeout(15000)
    await verificationPage.verifyVerificationScreenLoaded();

    // Step 11: Press device back button and verify navigation back to registration screen
    await verificationPage.pressDeviceBackButton();
    await registrationPage.verifyRegistrationUIElements();
  });

  test('SU-J002: Ensure invalid email formats are not accepted.', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const registrationPage = new RegistrationPage(page);

    // Step 1: Launch the app and verify landing screen is displayed
    // await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/');
    await landingPage.verifyLandingPageLoaded();

    // Step 2: Tap "Start Learning Smarter" button and verify Registration screen loads with disabled "Sign Up" button
    await landingPage.clickGetStarted();
    await registrationPage.verifySignUpButtonDisabled();

    // Step 3: Tap Name field and type "Test User"
    await registrationPage.nameInput.fill('Test User');
    await expect(registrationPage.nameInput).toHaveValue('Test User');

    // Step 4: Tap outside the field to remove focus & verify "Sign Up" remains disabled
    await registrationPage.removeFocus();
    await registrationPage.verifySignUpButtonDisabled();

    // Step 5: Tap Email field and type "userexample.com"
    await registrationPage.emailInput.pressSequentially('userexample.com', { delay: 180 });
    // await registrationPage.emailInput.fill('userexample.com');
    await expect(registrationPage.emailInput).toHaveValue('userexample.com');

    // Step 8: Tap outside the field to remove focus & verify invalid format error and disabled "Sign Up" button
    await registrationPage.removeFocus();
    await expect(registrationPage.emailInvalidError).toBeVisible();
    await registrationPage.verifySignUpButtonDisabled();

    // Step 9: Clear Email field and type "user@"
    await registrationPage.clearEmailField();
    await registrationPage.emailInput.pressSequentially('user@', { delay: 180 });
    await expect(registrationPage.emailInput).toHaveValue('user@');

    // Step 10: Tap outside the field to remove focus & verify missing domain error and disabled "Sign Up" button
    await registrationPage.removeFocus();
    await expect(registrationPage.emailInvalidError).toBeVisible();
    await registrationPage.verifySignUpButtonDisabled();
  });

  test('SU-J003: Confirm submit is disabled until mandatory fields are valid.', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const registrationPage = new RegistrationPage(page);

    // Step 1: Launch the app and verify landing screen is displayed
    await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');
    await registrationPage.verifyRegistrationUIElements();
    await registrationPage.verifySignUpButtonDisabled();

  })

  test('SU-J004: Sign Up remains disabled when only Name is filled', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    // Step 1: Launch the app and verify landing screen is displayed
    await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');

    await registrationPage.verifyRegistrationUIElements();
    await registrationPage.nameInput.click();
    await registrationPage.nameInput.pressSequentially('Hamza Rafique');

    await registrationPage.removeFocus();
    await registrationPage.verifySignUpButtonDisabled();
  })

  test('SU-J005: Sign Up remains disabled when only Email is filled', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    // Step 1: Launch the app and verify landing screen is displayed
    await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');

    await registrationPage.emailInput.click();
    await registrationPage.emailInput.pressSequentially('jamzarafique100@gmail.com')
    await registrationPage.removeFocus();
    await registrationPage.verifySignUpButtonDisabled();
  })

  test("SU-J006: Email validation rejects missing '@'", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    // Step 1: Launch the app and verify landing screen is displayed
    await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');

    await registrationPage.emailInput.click();
    await registrationPage.emailInput.pressSequentially('jamzarafique100gmail.com', { delay: 180 })
    await expect(registrationPage.emailInput).toHaveValue('jamzarafique100gmail.com')

    await registrationPage.removeFocus();
    await expect(registrationPage.emailInvalidError).toBeVisible()

  })

  test("SU-J007: Real-time password indicators show all non-compliant for 'pass'", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');
    await registrationPage.verifyRegistrationUIElements();

    await registrationPage.passwordInput.click();
    await registrationPage.passwordInput.pressSequentially('pass', { delay: 180 });
  });

  test('SU-J008: Verify user Scroll from top to bottom', async ({ page }) => {
    const landingPage = new LandingPage(page);

    // await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/');

    await landingPage.verifyLandingPageLoaded();
    await landingPage.footer.scrollIntoViewIfNeeded();
    await expect(landingPage.footer).toBeVisible();
    await page.mouse.wheel(0, -6800);
    await page.setViewportSize({
      width: 1536,
      height: 791,
    });

    console.log(await page.viewportSize().height);
    console.log(await page.viewportSize().width);

    // await page.setViewportSize().width(1536);

    // await page.pause();
  });

  test('SU-J009: Verify user move between the sections of landing page', async ({ page }) => {
    const landingPage = new LandingPage(page);

    // await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/');

    await landingPage.verifyLandingPageLoaded();
    await landingPage.verifyWhyVivloSectionShown();
    await landingPage.verifyCaptureSectionShown();
    await landingPage.verifyMeetViviSectionShown();
    await landingPage.verifyHowWorksSectionShown();
    await landingPage.verifyUseCasesSectionShown();

    // await page.pause();
  })


});