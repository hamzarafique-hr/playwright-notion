# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: spec\signIn.spec.js >> Sign-Up Flow >> SI-007: Verify user signin with Dynamic credentials
- Location: tests\spec\signIn.spec.js:99:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Get Started')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Get Started')
  - Test timeout of 30000ms exceeded.

```

```yaml
- alert
- link "vivlo home":
  - /url: /
  - img "vivlo"
- heading "Never lose a brilliant idea to a bad notebook." [level=1]
- heading "Login to vivlo" [level=2]
- button "Login with Google":
  - img
  - text: Login with Google
- text: Or Email *
- textbox "Enter your email": testuser_tit58k_1787551831496@gmail.com
- text: Password *
- textbox "Enter password": TestPass123!
- button "Show password"
- button "Keep me logged in" [pressed]
- button "Forgot Password?"
- text: Incorrect email or password. Please try again.
- button "Login"
- text: Don't have an account?
- link "Sign Up":
  - /url: /register
- link "Customer Support":
  - /url: /support
- link "Terms of Service":
  - /url: /terms
```

# Test source

```ts
  19  | 
  20  |     test('SI-002: Verify user navigates to the signup screen from login screen', async ({ page }) => {
  21  |         const landingPage = new LandingPage(page);
  22  |         const loginPage = new LoginPage(page);
  23  |         const registrationPage = new RegistrationPage(page);
  24  | 
  25  |         await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/')
  26  | 
  27  |         await landingPage.clickLogin()
  28  |         await loginPage.verifyLoginPageLoaded();
  29  | 
  30  |         await loginPage.signupButton.click();
  31  |         await registrationPage.verifyRegistrationUIElements();
  32  |     });
  33  |     test('SI-003: Verify user navigates back and forth to the signup screen from login screen', async ({ page }) => {
  34  |         const landingPage = new LandingPage(page);
  35  |         const loginPage = new LoginPage(page);
  36  |         const registrationPage = new RegistrationPage(page);
  37  | 
  38  |         await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/')
  39  | 
  40  |         await landingPage.clickLogin()
  41  |         await loginPage.verifyLoginPageLoaded();
  42  | 
  43  |         await loginPage.signupButton.click();
  44  |         await registrationPage.verifyRegistrationUIElements();
  45  |         await page.goBack();
  46  |         await loginPage.verifyLoginPageLoaded();
  47  |         await page.goBack();
  48  |         await landingPage.verifyLandingPageLoaded();
  49  |     });
  50  |     test('SI-004: Verify user navigates back and forth to the forgot password screen', async ({ page }) => {
  51  |         const loginPage = new LoginPage(page);
  52  |         const registrationPage = new RegistrationPage(page);
  53  | 
  54  |         await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/login');
  55  |         await loginPage.verifyLoginPageLoaded();
  56  |         await loginPage.clickForgotPassword();
  57  |         await page.goBack();
  58  |         await loginPage.verifyLoginPageLoaded();
  59  |         // await page.pause();
  60  |     });
  61  | 
  62  |     test('SI-005: Verify user signin with invalid email', async ({ page }) => {
  63  |         const loginPage = new LoginPage(page);
  64  |         const registrationPage = new RegistrationPage(page);
  65  | 
  66  |         await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/login');
  67  |         await loginPage.verifyLoginPageLoaded();
  68  | 
  69  |         await loginPage.inputEmail.click();
  70  |         await loginPage.inputEmail.pressSequentially('hamzawork@gmail.com');
  71  |         await expect(loginPage.inputEmail).toHaveValue('hamzawork@gmail.com');
  72  | 
  73  |         await loginPage.inputPassword.click();
  74  |         await loginPage.inputPassword.pressSequentially('Hamza0000');
  75  |         // await expect(loginPage.inputEmail).toHaveValue('Hamza0000');
  76  | 
  77  |         await loginPage.loginButton.click();
  78  |         await expect(loginPage.incorrectEmailError).toBeVisible();
  79  |     });
  80  |     test('SI-006: Verify user signin with incorrect password', async ({ page }) => {
  81  |         const loginPage = new LoginPage(page);
  82  |         const registrationPage = new RegistrationPage(page);
  83  | 
  84  |         await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/login');
  85  |         await loginPage.verifyLoginPageLoaded();
  86  | 
  87  |         await loginPage.inputEmail.click();
  88  |         await loginPage.inputEmail.pressSequentially('hamzawork9d@gmail.com');
  89  |         await expect(loginPage.inputEmail).toHaveValue('hamzawork9d@gmail.com');
  90  | 
  91  |         await loginPage.inputPassword.click();
  92  |         await loginPage.inputPassword.pressSequentially('Hamza000');
  93  |         // await expect(loginPage.inputEmail).toHaveValue('Hamza0000');
  94  | 
  95  |         await loginPage.loginButton.click();
  96  |         await expect(loginPage.incorrectEmailError).toBeVisible();
  97  |     });
  98  | 
  99  |     test('SI-007: Verify user signin with Dynamic credentials', async ({ page }) => {
  100 |         const loginPage = new LoginPage(page);
  101 |         const registrationPage = new RegistrationPage(page);
  102 |         const testUser = getTestUser();
  103 |         const homePage = new HomePage(page);
  104 | 
  105 |         await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/login');
  106 |         await loginPage.verifyLoginPageLoaded();
  107 | 
  108 |         await loginPage.inputEmail.click();
  109 |         await loginPage.inputEmail.pressSequentially(testUser.email);
  110 |         await expect(loginPage.inputEmail).toHaveValue(testUser.email);
  111 | 
  112 |         await loginPage.inputPassword.click();
  113 |         await loginPage.inputPassword.pressSequentially(testUser.password);
  114 |         // await expect(loginPage.inputEmail).toHaveValue('Hamza0000');
  115 | 
  116 |         await loginPage.loginButton.click();
  117 |         await loginPage.page.waitForTimeout(15000);
  118 |         // await expect(loginPage.incorrectEmailError).toBeVisible();
> 119 |         await expect(homePage.subHeading).toBeVisible();
      |                                           ^ Error: expect(locator).toBeVisible() failed
  120 |         await homePage.page.waitForTimeout(5000);
  121 |     });
  122 | 
  123 |     test('SI-008: Verify user signin with Default Valid credentials', async ({ page }) => {
  124 |         const loginPage = new LoginPage(page);
  125 |         const registrationPage = new RegistrationPage(page);
  126 |         const homePage = new HomePage(page);
  127 | 
  128 |         await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/login');
  129 |         await loginPage.verifyLoginPageLoaded();
  130 | 
  131 |         await loginPage.inputEmail.click();
  132 |         await loginPage.inputEmail.pressSequentially('hamzawork9d@gmail.com');
  133 |         await expect(loginPage.inputEmail).toHaveValue('hamzawork9d@gmail.com');
  134 | 
  135 |         await loginPage.inputPassword.click();
  136 |         await loginPage.inputPassword.pressSequentially('Hamza0000');
  137 |         // await expect(loginPage.inputEmail).toHaveValue('Hamza0000');
  138 | 
  139 |         await loginPage.loginButton.click();
  140 |         await loginPage.page.waitForTimeout(15000);
  141 |         // await expect(loginPage.incorrectEmailError).toBeVisible();
  142 |         await expect(homePage.subHeading).toBeVisible();
  143 |         await homePage.page.waitForTimeout(5000);
  144 |     });
  145 | 
  146 | 
  147 | 
  148 | 
  149 | 
  150 | 
  151 | });
  152 | 
```