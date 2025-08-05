import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
})

test.describe('Login functions', () => {
    test('If Login is succesfuly, must go to the items page', async ({ page }) => {      
        await page.fill('[data-test="username"]', 'standard_user')
        await page.fill('[data-test="password"]', 'secret_sauce')
        await page.click('[data-test="login-button"]')
        
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })
    
    test('If Login is`t succesfuly, must to show a error message', async ({ page }) => {
        await page.fill('[data-test="username"]', 'error_user')
        await page.fill('[data-test="password"]', 'erro_sauce')
        await page.click('[data-test="login-button"]')
    
        const error_message = page.locator('[data-test="error"]')
        await expect(error_message).toBeVisible()
        await expect(error_message).toContainText('Epic sadface: Username and password do not match any user in this service')
    })
})

test.describe('Logout functions', () => {
    test('Logout succesfuly', async ({ page }) => {
        await page.fill('[data-test="username"]', 'standard_user')
        await page.fill('[data-test="password"]', 'secret_sauce')
        await page.click('[data-test="login-button"]') 

        await page.click('#react-burger-menu-btn')
    
        const logoutLink = page.locator('#logout_sidebar_link')

        await expect(logoutLink).toBeVisible()
        await logoutLink.click()

        await expect(page).toHaveURL('https://www.saucedemo.com/')
    })
})
