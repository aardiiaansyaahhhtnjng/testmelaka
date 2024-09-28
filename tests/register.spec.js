import { test, expect } from '@playwright/test';

// async function register(page, name = '', phone = '', business = '', username = '', password = '', repassword = '') {
//   await test.step('Registration attempt', async () => {
//     if (name) {
//       await page.getByLabel('Nama').fill(name);
//     }
//     if (phone) {
//       await page.getByLabel('Nomor Telepon').fill(phone);
//     }
//     if (business) {
//       await page.getByLabel('Nama Bisnis Kamu').fill(business);
//     }
//     if (username) {
//       await page.getByLabel('Email').fill(username);
//     }
//     if (password) {
//       await page.getByLabel('Kata Sandi').fill(password);
//     }
//     if (repassword) {
//       await page.getByLabel('Konfirmasi Kata Sandi').fill(repassword);
//     }

//     await page.getByLabel('Dengan melanjutkan pendaftaran, kamu setuju dengan').check(); 
//     await page.getByRole('button', { name: /Daftar/i }).click(); 
//   });
// }

test.describe('Registration Page Test', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://dashboard.melaka.app/register', { waitUntil: 'domcontentloaded' });
    });
  
    test('verify the heading is correct', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Selamat Datang di Melaka' })).toBeVisible();
    });
  
    test('Registration form visibility', async ({ page }) => {
      await expect(page.getByTestId('register__text-field__name')).toBeVisible(); // Menggunakan getByTestId untuk elemen "Nama"
      await expect(page.getByTestId('register__text-field__phone-number')).toBeVisible();
      await expect(page.getByTestId('register__text-field__business-name')).toBeVisible();
      await expect(page.getByTestId('register__text-field__email')).toBeVisible();
      await expect(page.getByTestId('register__text-field__password')).toBeVisible();
      await expect(page.getByTestId('register__text-field__confirm-password')).toBeVisible();
    });

    test('Tombol daftar', async ({ page }) => {
        const tncCheckbox = page.getByTestId('register__checkbox__tnc');
        await expect(tncCheckbox).toBeVisible();
        await tncCheckbox.check();
        await expect(page.getByRole('button', { name: /Daftar/i })).toBeVisible();
    })

    test('jika sudah punya akun, maka bisa login', async ({ page }) => {
        const masuk = page.getByRole('link', { name: /Masuk/i });
        await expect(masuk).toBeVisible();
        await masuk.click();
        await expect(page).toHaveURL(/.*login/);
    })
  });  