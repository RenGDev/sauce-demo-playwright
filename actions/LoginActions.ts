import { Page } from '@playwright/test';

const user: Record<string, string> = {
  'username': "standard_user",
  'password': "secret_sauce"
}

export async function loginAs(page: Page, username: string, password: string) {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', user['username'])
    await page.fill('[data-test="password"]', user['password'])
    await page.click('[data-test="login-button"]')
}
