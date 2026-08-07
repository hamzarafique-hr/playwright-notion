# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: spec\signUp.spec.js >> Sign-Up Flow >> SU-J009: Verify user move between the sections of landing page
- Location: tests\spec\signUp.spec.js:166:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://synapse-web-v2-poc.quadrupleapps.com/", waiting until "load"

```

# Test source

```ts
  69  | 
  70  |     // Step 5: Tap Email field and type "userexample.com"
  71  |     await registrationPage.emailInput.pressSequentially('userexample.com', { delay: 180 });
  72  |     // await registrationPage.emailInput.fill('userexample.com');
  73  |     await expect(registrationPage.emailInput).toHaveValue('userexample.com');
  74  | 
  75  |     // Step 8: Tap outside the field to remove focus & verify invalid format error and disabled "Sign Up" button
  76  |     await registrationPage.removeFocus();
  77  |     await expect(registrationPage.emailInvalidError).toBeVisible();
  78  |     await registrationPage.verifySignUpButtonDisabled();
  79  | 
  80  |     // Step 9: Clear Email field and type "user@"
  81  |     await registrationPage.clearEmailField();
  82  |     await registrationPage.emailInput.pressSequentially('user@', { delay: 180 });
  83  |     await expect(registrationPage.emailInput).toHaveValue('user@');
  84  | 
  85  |     // Step 10: Tap outside the field to remove focus & verify missing domain error and disabled "Sign Up" button
  86  |     await registrationPage.removeFocus();
  87  |     await expect(registrationPage.emailInvalidError).toBeVisible();
  88  |     await registrationPage.verifySignUpButtonDisabled();
  89  |   });
  90  | 
  91  |   test('SU-J003: Confirm submit is disabled until mandatory fields are valid.', async ({ page }) => {
  92  |     const landingPage = new LandingPage(page);
  93  |     const registrationPage = new RegistrationPage(page);
  94  | 
  95  |     // Step 1: Launch the app and verify landing screen is displayed
  96  |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');
  97  |     await registrationPage.verifyRegistrationUIElements();
  98  |     await registrationPage.verifySignUpButtonDisabled();
  99  | 
  100 |   })
  101 | 
  102 |   test('SU-J004: Sign Up remains disabled when only Name is filled', async ({ page }) => {
  103 |     const registrationPage = new RegistrationPage(page);
  104 | 
  105 |     // Step 1: Launch the app and verify landing screen is displayed
  106 |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');
  107 | 
  108 |     await registrationPage.verifyRegistrationUIElements();
  109 |     await registrationPage.nameInput.click();
  110 |     await registrationPage.nameInput.pressSequentially('Hamza Rafique');
  111 | 
  112 |     await registrationPage.removeFocus();
  113 |     await registrationPage.verifySignUpButtonDisabled();
  114 |   })
  115 | 
  116 |   test('SU-J005: Sign Up remains disabled when only Email is filled', async ({ page }) => {
  117 |     const registrationPage = new RegistrationPage(page);
  118 | 
  119 |     // Step 1: Launch the app and verify landing screen is displayed
  120 |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');
  121 | 
  122 |     await registrationPage.emailInput.click();
  123 |     await registrationPage.emailInput.pressSequentially('jamzarafique100@gmail.com')
  124 |     await registrationPage.removeFocus();
  125 |     await registrationPage.verifySignUpButtonDisabled();
  126 |   })
  127 | 
  128 |   test("SU-J006: Email validation rejects missing '@'", async ({ page }) => {
  129 |     const registrationPage = new RegistrationPage(page);
  130 | 
  131 |     // Step 1: Launch the app and verify landing screen is displayed
  132 |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');
  133 | 
  134 |     await registrationPage.emailInput.click();
  135 |     await registrationPage.emailInput.pressSequentially('jamzarafique100gmail.com', { delay: 180 })
  136 |     await expect(registrationPage.emailInput).toHaveValue('jamzarafique100gmail.com')
  137 | 
  138 |     await registrationPage.removeFocus();
  139 |     await expect(registrationPage.emailInvalidError).toBeVisible()
  140 | 
  141 |   })
  142 | 
  143 |   test("SU-J007: Real-time password indicators show all non-compliant for 'pass'", async ({ page }) => {
  144 |     const registrationPage = new RegistrationPage(page);
  145 | 
  146 |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/register/');
  147 |     await registrationPage.verifyRegistrationUIElements();
  148 | 
  149 |     await registrationPage.passwordInput.click();
  150 |     await registrationPage.passwordInput.pressSequentially('pass', { delay: 180 });
  151 |   });
  152 | 
  153 |   test('SU-J008: Verify user Scroll from top to bottom' , async ({page}) => {
  154 |     const landingPage = new LandingPage(page);
  155 |     
  156 |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/');
  157 | 
  158 |     await landingPage.verifyLandingPageLoaded();
  159 |     await landingPage.footer.scrollIntoViewIfNeeded({delay: 150});
  160 |     await expect(landingPage.footer).toBeVisible();
  161 |     await page.mouse.wheel(0, -6800);
  162 | 
  163 |     // await page.pause();
  164 |   });
  165 | 
  166 |   test('SU-J009: Verify user move between the sections of landing page' , async ({page}) => {
  167 |     const landingPage = new LandingPage(page);
  168 |     
> 169 |     await page.goto('https://synapse-web-v2-poc.quadrupleapps.com/');
      |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  170 | 
  171 |     await landingPage.verifyLandingPageLoaded();
  172 |     await landingPage.verifyWhyVivloSectionShown();
  173 |     await landingPage.verifyCaptureSectionShown();
  174 |     await landingPage.verifyMeetViviSectionShown();
  175 |     await landingPage.verifyHowWorksSectionShown();
  176 |     await landingPage.verifyUseCasesSectionShown();
  177 | 
  178 |     // await page.pause();
  179 |   })
  180 | 
  181 | 
  182 | });
```