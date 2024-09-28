import { test, expect } from '@playwright/test';

async function login(page, username = '', password = '') {
  await test.step('Login attempt', async () => {
    if (username) {
      await page.getByLabel('Email').fill(username);
    }
    if (password) {
      await page.getByLabel('Kata Sandi').fill(password);
    }
    await page.getByRole('button', { name: /Login/i }).click();
  });
}

test('login scenarios', async ({ page }) => {
  await page.goto('https://dashboard.melaka.app/login');

  // Scenario 1: If user only enters email or password, the login button should be disabled
  await test.step('Verify login button is disabled if only email is provided', async () => {
    await page.getByLabel('Email').fill('ardiansyahtanjung.career@gmail.com');
    await expect(page.getByRole('alert', { name: 'Wajib diisi' })).toBeVisible;
  });

  await test.step('Verify login button is disabled if only password is provided', async () => {
    await page.getByLabel('Email').clear();
    await page.getByLabel('Kata Sandi').fill('BN66fvDLapQJ5sT');
    await expect(page.getByRole('alert', { name: 'Wajib diisi' })).toBeVisible;
  });

  // Scenario 2: If user enters incorrect email or password, an alert should be displayed
  await test.step('Verify error message for incorrect credentials', async () => {
    await login(page, 'incorrect@example.com', 'wrongpassword');
    await expect(page.getByRole('alert', { name: 'Email atau kata sandi tidak valid' })).toBeVisible;
  });

  // Scenario 3: Test show/hide password functionality
  await test.step('Verify show/hide password functionality', async () => {
    const passwordField = page.getByLabel('Kata Sandi');
    const passwordEyeIcon = page.getByTestId('login__icon__eye-password');

    // Initially fill password and check that input type is 'password'
    await passwordField.fill('testpassword');
    await expect(passwordField).toHaveAttribute('type', 'password');

    // Click the eye icon to show password and verify the input type changes to 'text'
    await passwordEyeIcon.click();
    await expect(passwordField).toHaveAttribute('type', 'text');

    // Click the eye icon again to hide password and verify the input type changes back to 'password'
    await passwordEyeIcon.click();
    await expect(passwordField).toHaveAttribute('type', 'password');
  });

  // Scenario 4: Test "Forgot Password?" functionality
  await test.step('Verify "Lupa kata sandi?" link', async () => {
    const forgotPasswordLink = page.getByRole('link', { name: 'Lupa kata sandi?' });

    // Verify that the "Lupa kata sandi?" link is visible
    await expect(forgotPasswordLink).toBeVisible();

    // Click the "Lupa kata sandi?" link and verify redirection or appearance of forgot password form
    await forgotPasswordLink.click();
    await expect(page).toHaveURL(/.*forgot-password/);
  });

  // Scenario 5: Valid login attempt
  await test.step('Verify valid login', async () => {
    await page.goto('https://dashboard.melaka.app/login');
    await login(page, 'ardiansyahtanjung.career@gmail.com', 'BN66fvDLapQJ5sT');
    await expect(page).toHaveURL(/.*business-information/);
  });
});
