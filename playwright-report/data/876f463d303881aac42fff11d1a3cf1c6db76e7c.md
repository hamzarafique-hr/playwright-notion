# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: spec\signUp.spec.js >> Sign-Up Flow >> SU-J002: Ensure invalid email formats are not accepted.
- Location: tests\spec\signUp.spec.js:56:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Please enter a valid email address (e.g. you@example.com).', { exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Please enter a valid email address (e.g. you@example.com).', { exact: true })

```

```yaml
- link "vivlo home":
  - /url: /
  - img "vivlo"
- heading "Never lose a brilliant idea to a bad notebook." [level=1]
- heading "Create your account" [level=2]
- paragraph: Get started in just a few steps, it's quick and free.
- button "Login with Google":
  - img
  - text: Login with Google
- text: Or Name*
- textbox "Name*":
  - /placeholder: Your full name
  - text: Test User
- text: Email*
- textbox "Email*":
  - /placeholder: you@example.com
  - text: userexample.com
- text: Password*
- textbox "••••••••"
- button "Show password"
- paragraph: Must contain at least;
- text: At least 1 uppercase At least 1 number At least 8 characters Confirm Password*
- textbox "••••••••"
- button "Show password"
- paragraph:
  - text: By creating an account, you agree to our
  - link "Terms & Conditions":
    - /url: /terms-and-conditions
  - text: and
  - link "Privacy Policy":
    - /url: /privacy
- button "Sign Up" [disabled]
- paragraph:
  - text: Already have an account?
  - link "Sign In":
    - /url: /login
- alert
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { LandingPage } from '../page/LandingPage.js';
  3   | import { RegistrationPage } from '../page/RegistrationPage.js';
  4   | import { VerificationPage } from '../page/VerificationPage.js';
  5   | import { generateTestUser } from '../utils/testData.js';
  6   | 
  7   | test.describe('Sign-Up Flow', () => {
  8   | 
  9   |   test.beforeEach(async ({ page }) => {
  10  |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/');
  11  |     console.log('Starting Sign-Up Flow Suite');
  12  |   });
  13  | 
  14  |   test('SU-J001: Complete sign-up happy path and verify pending screen', async ({ page }) => {
  15  |     // Page Objects initialization
  16  |     const landingPage = new LandingPage(page);
  17  |     const registrationPage = new RegistrationPage(page);
  18  |     const verificationPage = new VerificationPage(page);
  19  | 
  20  |     const testUser = generateTestUser();
  21  | 
  22  |     // Step 1 & 2: Launch app and wait for landing screen to load
  23  |     // await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/');
  24  |     await landingPage.verifyLandingPageLoaded();
  25  | 
  26  |     // Step 3 & 4: Tap "Get started" button and wait for registration screen
  27  |     await landingPage.clickGetStarted();
  28  |     await registrationPage.verifyRegistrationUIElements();
  29  | 
  30  |     // Step 5 - 8: Fill out registration details & verify populated values
  31  |     await registrationPage.fillForm(
  32  |       testUser.name,
  33  |       testUser.email,
  34  |       testUser.password,
  35  |       testUser.confirmPassword,
  36  |     );
  37  | 
  38  |     await expect(registrationPage.nameInput).toHaveValue(testUser.name);
  39  |     await expect(registrationPage.emailInput).toHaveValue(testUser.email);
  40  |     await expect(registrationPage.passwordInput).toHaveValue(testUser.password);
  41  |     await expect(registrationPage.confirmPasswordInput).toHaveValue(testUser.confirmPassword);
  42  | 
  43  |     // Step 9: Tap "Sign Up" button
  44  |     await registrationPage.clickSignUp();
  45  |     await registrationPage.page.waitForTimeout(20000)
  46  | 
  47  |     // Step 10: Wait for verification screen to load and verify elements
  48  |     // await page.waitForTimeout(15000)
  49  |     await verificationPage.verifyVerificationScreenLoaded();
  50  | 
  51  |     // Step 11: Press device back button and verify navigation back to registration screen
  52  |     await verificationPage.pressDeviceBackButton();
  53  |     await registrationPage.verifyRegistrationUIElements();
  54  |   });
  55  | 
  56  |   test('SU-J002: Ensure invalid email formats are not accepted.', async ({ page }) => {
  57  |     const landingPage = new LandingPage(page);
  58  |     const registrationPage = new RegistrationPage(page);
  59  | 
  60  |     // Step 1: Launch the app and verify landing screen is displayed
  61  |     // await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/');
  62  |     await landingPage.verifyLandingPageLoaded();
  63  | 
  64  |     // Step 2: Tap "Start Learning Smarter" button and verify Registration screen loads with disabled "Sign Up" button
  65  |     await landingPage.clickGetStarted();
  66  |     await registrationPage.verifySignUpButtonDisabled();
  67  | 
  68  |     // Step 3: Tap Name field and type "Test User"
  69  |     await registrationPage.nameInput.fill('Test User');
  70  |     await expect(registrationPage.nameInput).toHaveValue('Test User');
  71  | 
  72  |     // Step 4: Tap outside the field to remove focus & verify "Sign Up" remains disabled
  73  |     await registrationPage.removeFocus();
  74  |     await registrationPage.verifySignUpButtonDisabled();
  75  | 
  76  |     // Step 5: Tap Email field and type "userexample.com"
  77  |     await registrationPage.emailInput.pressSequentially('userexample.com', { delay: 180 });
  78  |     // await registrationPage.emailInput.fill('userexample.com');
  79  |     await expect(registrationPage.emailInput).toHaveValue('userexample.com');
  80  | 
  81  |     // Step 8: Tap outside the field to remove focus & verify invalid format error and disabled "Sign Up" button
  82  |     await registrationPage.removeFocus();
> 83  |     await expect(registrationPage.emailInvalidError).toBeVisible();
      |                                                      ^ Error: expect(locator).toBeVisible() failed
  84  |     await registrationPage.verifySignUpButtonDisabled();
  85  | 
  86  |     // Step 9: Clear Email field and type "user@"
  87  |     await registrationPage.clearEmailField();
  88  |     await registrationPage.emailInput.pressSequentially('user@', { delay: 180 });
  89  |     await expect(registrationPage.emailInput).toHaveValue('user@');
  90  | 
  91  |     // Step 10: Tap outside the field to remove focus & verify missing domain error and disabled "Sign Up" button
  92  |     await registrationPage.removeFocus();
  93  |     await expect(registrationPage.emailInvalidError).toBeVisible();
  94  |     await registrationPage.verifySignUpButtonDisabled();
  95  |   });
  96  | 
  97  |   test('SU-J003: Confirm submit is disabled until mandatory fields are valid.', async ({ page }) => {
  98  |     const landingPage = new LandingPage(page);
  99  |     const registrationPage = new RegistrationPage(page);
  100 | 
  101 |     // Step 1: Launch the app and verify landing screen is displayed
  102 |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');
  103 |     await registrationPage.verifyRegistrationUIElements();
  104 |     await registrationPage.verifySignUpButtonDisabled();
  105 | 
  106 |   })
  107 | 
  108 |   test('SU-J004: Sign Up remains disabled when only Name is filled', async ({ page }) => {
  109 |     const registrationPage = new RegistrationPage(page);
  110 | 
  111 |     // Step 1: Launch the app and verify landing screen is displayed
  112 |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');
  113 | 
  114 |     await registrationPage.verifyRegistrationUIElements();
  115 |     await registrationPage.nameInput.click();
  116 |     await registrationPage.nameInput.pressSequentially('Hamza Rafique');
  117 | 
  118 |     await registrationPage.removeFocus();
  119 |     await registrationPage.verifySignUpButtonDisabled();
  120 |   })
  121 | 
  122 |   test('SU-J005: Sign Up remains disabled when only Email is filled', async ({ page }) => {
  123 |     const registrationPage = new RegistrationPage(page);
  124 | 
  125 |     // Step 1: Launch the app and verify landing screen is displayed
  126 |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');
  127 | 
  128 |     await registrationPage.emailInput.click();
  129 |     await registrationPage.emailInput.pressSequentially('jamzarafique100@gmail.com')
  130 |     await registrationPage.removeFocus();
  131 |     await registrationPage.verifySignUpButtonDisabled();
  132 |   })
  133 | 
  134 |   test("SU-J006: Email validation rejects missing '@'", async ({ page }) => {
  135 |     const registrationPage = new RegistrationPage(page);
  136 | 
  137 |     // Step 1: Launch the app and verify landing screen is displayed
  138 |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');
  139 | 
  140 |     await registrationPage.emailInput.click();
  141 |     await registrationPage.emailInput.pressSequentially('jamzarafique100gmail.com', { delay: 180 })
  142 |     await expect(registrationPage.emailInput).toHaveValue('jamzarafique100gmail.com')
  143 | 
  144 |     await registrationPage.removeFocus();
  145 |     await expect(registrationPage.emailInvalidError).toBeVisible()
  146 | 
  147 |   })
  148 | 
  149 |   test("SU-J007: Real-time password indicators show all non-compliant for 'pass'", async ({ page }) => {
  150 |     const registrationPage = new RegistrationPage(page);
  151 | 
  152 |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');
  153 |     await registrationPage.verifyRegistrationUIElements();
  154 | 
  155 |     await registrationPage.passwordInput.click();
  156 |     await registrationPage.passwordInput.pressSequentially('pass', { delay: 180 });
  157 |   });
  158 | 
  159 |   test('SU-J008: Verify user Scroll from top to bottom', async ({ page }) => {
  160 |     const landingPage = new LandingPage(page);
  161 | 
  162 |     // await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/');
  163 | 
  164 |     await landingPage.verifyLandingPageLoaded();
  165 |     await landingPage.footer.scrollIntoViewIfNeeded();
  166 |     await expect(landingPage.footer).toBeVisible();
  167 |     await page.mouse.wheel(0, -6800);
  168 |     await page.setViewportSize({
  169 |       width: 1536,
  170 |       height: 791,
  171 |     });
  172 | 
  173 |     console.log(await page.viewportSize().height);
  174 |     console.log(await page.viewportSize().width);
  175 | 
  176 |     // await page.setViewportSize().width(1536);
  177 | 
  178 |     // await page.pause();
  179 |   });
  180 | 
  181 |   test('SU-J009: Verify user move between the sections of landing page', async ({ page }) => {
  182 |     const landingPage = new LandingPage(page);
  183 | 
```