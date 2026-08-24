# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: spec\home.spec.js >> Homescreen flows >> Verify user flow from logIn to LogOut
- Location: tests\spec\home.spec.js:8:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - generic [ref=e3]:
    - generic [ref=e5]:
      - link "vivlo home" [ref=e7] [cursor=pointer]:
        - /url: /
        - img "vivlo" [ref=e8]
      - heading "Never lose a brilliant idea to a bad notebook." [level=1] [ref=e9]
    - generic [ref=e13]:
      - generic [ref=e14]:
        - heading "Login to vivlo" [level=2] [ref=e15]
        - generic [ref=e16]:
          - button "Login with Google" [ref=e18]
          - generic [ref=e26]: Or
          - generic [ref=e30]:
            - generic [ref=e31]:
              - generic [ref=e32]:
                - generic [ref=e33]:
                  - text: Email
                  - generic [ref=e34]: "*"
                - textbox "Enter your email" [ref=e35]: hamzawork9d@gmail.com
              - generic [ref=e36]:
                - generic [ref=e37]:
                  - text: Password
                  - generic [ref=e38]: "*"
                - generic [ref=e39]:
                  - textbox "Enter password" [ref=e40]: Hamza0000
                  - button "Show password" [ref=e41]
              - generic [ref=e47]:
                - button "Keep me logged in" [pressed] [ref=e48]
                - button "Forgot Password?" [ref=e53]
            - generic [ref=e54]:
              - button "Login" [ref=e55]
              - generic [ref=e56]:
                - generic [ref=e57]: Don't have an account?
                - link "Sign Up" [ref=e58] [cursor=pointer]:
                  - /url: /register
      - generic [ref=e59]:
        - link "Customer Support" [ref=e60] [cursor=pointer]:
          - /url: /support
        - link "Terms of Service" [ref=e61] [cursor=pointer]:
          - /url: /terms
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
  43 |     await this.inputEmail.pressSequentially(email);
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
     |                     ^ Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
```