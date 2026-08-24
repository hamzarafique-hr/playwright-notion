# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: spec\signIn.spec.js >> Sign-Up Flow >> SI-004: Verify user navigates back and forth to the forgot password screen
- Location: tests\spec\signIn.spec.js:50:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Login to vivlo' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Login to vivlo' })

```

# Test source

```ts
  1  | import { expect } from "@playwright/test";
  2  | 
  3  | export class LoginPage {
  4  |     /**
  5  |     * @param {import('@playwright/test').Page} page
  6  |     */
  7  |   constructor(page) {
  8  |     this.page = page;
  9  | 
  10 |     // Locators
  11 |     this.header = page.getByRole('heading', { name: 'Login to vivlo' });
  12 |     this.inputEmail = page.getByRole('textbox', { name: 'Enter your email' });
  13 |     this.inputPassword = page.getByPlaceholder('Enter password');
  14 |     this.loginButton = page.getByText('Login', { exact: true });
  15 |     this.forgotPassword = page.getByRole('button', { name: 'Forgot Password?' });
  16 |     this.signupButton = page.getByRole('link', { name: 'Sign Up' });
  17 |     this.headerForgot = page.getByRole('heading', { name: 'Forgot Password' });
  18 | 
  19 |     // Validation Error Locators
  20 |     this.incorrectEmailError = page.getByText('Incorrect email or password. Please try again.', { exact: true });
  21 |   }
  22 |     // Actions 
  23 |   async verifyLoginPageLoaded() {
  24 |     await expect(this.header).toBeVisible();
  25 |     await expect(this.inputEmail).toBeVisible();
  26 |     await expect(this.inputPassword).toBeVisible();
  27 |     await expect(this.loginButton).toBeVisible();
  28 |   }
  29 | 
  30 |   async clickForgotPassword() {
  31 |     await this.forgotPassword.click();
  32 |     // await expect(this.headerForgot).toBeVisible();
  33 |   }
  34 | 
  35 |   async invalidEmailLogin() {
  36 | 
  37 |   }
  38 | 
  39 |   async login({ email, password }) {
  40 |     await this.verifyLoginPageLoaded();
  41 | 
  42 |     await this.inputEmail.click();
> 43 |     await this.inputEmail.pressSequentially(email);
     |                                          ^ Error: expect(locator).toBeVisible() failed
  44 |     await expect(this.inputEmail).toHaveValue(email);
  45 | 
  46 |     await this.inputPassword.click();
  47 |     await this.inputPassword.pressSequentially(password);
  48 | 
  49 |     await this.loginButton.click();
  50 |     await this.page.waitForTimeout(15000);
  51 |   }
  52 | }
  53 | 
```