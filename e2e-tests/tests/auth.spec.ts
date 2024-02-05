import { test, expect } from '@playwright/test';
import exp from 'constants';

const baseUrl = 'http://localhost:5174';

test('should allow user to sign in ', async ({ page }) => {
  await page.goto(baseUrl)

  //get the sign in button
 await page.getByRole('link', { name: 'Login' }).click();

  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();

  await page.locator('[name=email]').fill('timmyhaung@gmail.com')

  await page.locator('[name=password]').fill('12345678')

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();

  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});


test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(baseUrl);

  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.getByText("Account created")).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});