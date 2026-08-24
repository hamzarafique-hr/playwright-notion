# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: spec\signIn.spec.js >> Sign-Up Flow >> SI-002: Verify user navigates to the signup screen from login screen
- Location: tests\spec\signIn.spec.js:20:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Create your account' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Create your account' })

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
- textbox "Enter your email"
- text: Password *
- textbox "Enter password"
- button "Show password"
- button "Keep me logged in" [pressed]
- button "Forgot Password?"
- button "Login" [disabled]
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
  1   | import { expect } from '@playwright/test';
  2   | 
  3   | export class RegistrationPage {
  4   |   /**
  5   |    * @param {import('@playwright/test').Page} page
  6   |    */
  7   |   constructor(page) {
  8   |     this.page = page;
  9   | 
  10  |     // Locators
  11  |     this.header = page.getByRole('heading', { name: 'Create your account' });
  12  |     this.googleLoginButton = page.getByRole('button', { name: 'Login with Google' });
  13  |     this.nameInput = page.getByPlaceholder('Your full name');
  14  |     this.emailInput = page.getByPlaceholder('you@example.com');
  15  |     this.passwordInput = page.getByTestId('register-password');
  16  |     this.confirmPasswordInput = page.getByTestId('register-confirm');
  17  |     this.termsLink = page.getByRole('link', { name: 'Terms & Conditions' });
  18  |     this.privacyLink = page.getByRole('link', { name: 'Privacy Policy' });
  19  |     this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
  20  | 
  21  |     // Validation Error Locators
  22  |     this.emailInvalidError = page.getByText('Please enter a valid email address (e.g. you@example.com).', { exact: true });
  23  |     this.confirmPasswordError = page.getByText('The password and confirm password do not match.', { exact: true });
  24  |     this.passwordMatch = page.getByText('Passwords match.', { exact: true });
  25  | 
  26  |     // Password indicator Locators
  27  |     this.uppercaseIndicator = page.locator("//div[1]//span[1]");
  28  |     this.numberIndicator = page.locator('div.flex.items-center.gap-1\.5.text-xs').locator('span').nth(0);
  29  |     this.lengthIndicator = page.locator("//div[@class='flex flex-col gap-1 mt-1']//div[3]//span[1]//*[name()='svg']");
  30  | 
  31  | 
  32  |     this.uppercaseRequirement = page.locator('div.flex.items-center.gap-1\\.5.text-xs:has-text("At least 1 uppercase")');
  33  | 
  34  |     this.numberRequirement = page.locator('div.flex.items-center.gap-1\\.5.text-xs:has-text("At least 1 number")');
  35  | 
  36  |     this.lengthRequirement = page.locator('div.flex.items-center.gap-1\\.5.text-xs:has-text("At least 8 characters")');
  37  |   }
  38  | 
  39  |   async verifyRegistrationUIElements() {
> 40  |     await expect(this.header).toBeVisible();
      |                               ^ Error: expect(locator).toBeVisible() failed
  41  |     await expect(this.googleLoginButton).toBeVisible();
  42  |     await expect(this.nameInput).toBeVisible();
  43  |     await expect(this.emailInput).toBeVisible();
  44  |     await expect(this.passwordInput).toBeVisible();
  45  |     await expect(this.confirmPasswordInput).toBeVisible();
  46  |     await expect(this.termsLink).toBeVisible();
  47  |     await expect(this.privacyLink).toBeVisible();
  48  |     await expect(this.signUpButton).toBeVisible();
  49  |   }
  50  | 
  51  |   // async fillForm(name, email, password, confirmPassword) {
  52  |   //   await this.nameInput.fill(name);
  53  |   //   await this.emailInput.fill(email);
  54  |   //   await this.passwordInput.fill(password);
  55  |   //   await this.confirmPasswordInput.fill(confirmPassword);
  56  |   // }
  57  | 
  58  |   async fillForm(name, email, password, confirmPassword) {
  59  |     await this.nameInput.pressSequentially(name);
  60  |     await expect(this.nameInput).toHaveValue(name);
  61  |     await this.removeFocus();
  62  | 
  63  |     await this.emailInput.pressSequentially(email);
  64  |     await expect(this.emailInput).toHaveValue(email);
  65  |     await this.removeFocus();
  66  | 
  67  |     await this.passwordInput.pressSequentially(password, { delay: 50 });
  68  |     await expect(this.passwordInput).toHaveValue(password);
  69  |     await this.removeFocus();
  70  | 
  71  |     await this.confirmPasswordInput.pressSequentially(confirmPassword, { delay: 50 });
  72  |     await expect(this.confirmPasswordInput).toHaveValue(confirmPassword);
  73  |     await this.removeFocus();
  74  |   }
  75  | 
  76  |   // async fillForm(name, email, password, confirmPassword) {
  77  |   //   await this.nameInput.click();
  78  |   //   await this.nameInput.fill(name);
  79  |   //   // await this.nameInput.pressSequentially(name, { delay: 50 });
  80  |   //   // await this.nameInput.press('Tab');
  81  |   //   await this.removeFocus();
  82  | 
  83  |   //   await this.emailInput.click();
  84  |   //   await this.emailInput.fill(email);
  85  |   //   // await this.emailInput.pressSequentially(email, { delay: 50 });
  86  |   //   // await this.emailInput.press('Tab');
  87  |   //   await this.removeFocus();
  88  | 
  89  |   //   await this.passwordInput.click();
  90  |   //   await this.passwordInput.pressSequentially(password, { delay: 180 });
  91  |   //   // await this.passwordInput.press('Tab');
  92  |   //   await this.removeFocus();
  93  | 
  94  |   //   await this.confirmPasswordInput.click();
  95  |   //   await this.confirmPasswordInput.pressSequentially(confirmPassword, { delay: 180 });
  96  |   //   // await this.confirmPasswordInput.press('Tab');
  97  |   //   // await this.confirmPasswordInput.blur();
  98  |   //   await this.removeFocus();
  99  |   // }
  100 | 
  101 |   async removeFocus() {
  102 |     await this.header.click();
  103 |   }
  104 | 
  105 |   async clearNameField() {
  106 |     await this.nameInput.clear();
  107 |   }
  108 | 
  109 |   async clearEmailField() {
  110 |     await this.emailInput.clear();
  111 |   }
  112 | 
  113 |   async verifySignUpButtonDisabled() {
  114 |     await expect(this.signUpButton).toBeDisabled();
  115 |   }
  116 | 
  117 | 
  118 | 
  119 | 
  120 | 
  121 |   async clickSignUp() {
  122 |     await expect(this.signUpButton).toBeEnabled();
  123 |     await this.signUpButton.click();
  124 |   }
  125 | 
  126 |   async expectRequirementNotMet(requirement) {
  127 |     await expect(requirement.locator('svg.lucide-circle')).toBeVisible();
  128 |     await expect(requirement.locator('svg.lucide-check')).toHaveCount(0);
  129 |   }
  130 | 
  131 |   async expectRequirementMet(requirement) {
  132 |     await expect(requirement.locator('svg.lucide-check')).toBeVisible();
  133 |     await expect(requirement.locator('svg.lucide-circle')).toHaveCount(0);
  134 |   }
  135 | 
  136 | }
```