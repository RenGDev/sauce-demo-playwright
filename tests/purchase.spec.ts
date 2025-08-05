import { test, expect } from '@playwright/test'
import { loginAs } from '../actions/LoginActions';


const checkout_fields: Record<string, string> = {
  'firstName': "Lorenzo",
  'lastName': "Gonçalves",
  'postalCode': "96300000"
}

test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user', 'secret_sauce')
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]')
    await page.click('[data-test="shopping-cart-link"]')
    await page.click('[data-test="checkout"]')
})

test.describe('Shopping functions', () => {
    test('Purchase item', async ({ page }) => {        
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        
        await page.fill('[data-test="firstName"]', checkout_fields['firstName'])
        await page.fill('[data-test="lastName"]', checkout_fields['lastName'])
        await page.fill('[data-test="postalCode"]', checkout_fields['postalCode'])
        await page.click('[data-test="continue"]')
        
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        
        await page.click('[data-test="finish"]')
        
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
    })

    test('Checkout if First name field is null, must to show an error', async ({ page }) => {    
        await page.fill('[data-test="lastName"]', checkout_fields['lastName'])
        await page.fill('[data-test="postalCode"]', checkout_fields['postalCode'])

        await page.click('[data-test="continue"]')
        
        const error_message = page.locator('[data-test="error"]')
        await expect(error_message).toBeVisible()
        await expect(error_message).toContainText('Error: First Name is required')
    })

    test('Checkout if Last name field is null, must to show an error', async ({ page }) => {
        await page.fill('[data-test="firstName"]', checkout_fields['firstName'])
        await page.fill('[data-test="postalCode"]', checkout_fields['postalCode'])

        await page.click('[data-test="continue"]')
        
        const error_message = page.locator('[data-test="error"]')
        await expect(error_message).toBeVisible()
        await expect(error_message).toContainText('Error: Last Name is required')
    })

    test('Checkout if Postal code field is null, must to show an error', async ({ page }) => {   
        await page.fill('[data-test="firstName"]', checkout_fields['firstName'])
        await page.fill('[data-test="lastName"]', checkout_fields['lastName'])

        await page.click('[data-test="continue"]')
        
        const error_message = page.locator('[data-test="error"]')
        await expect(error_message).toBeVisible()
        await expect(error_message).toContainText('Error: Postal Code is required')
    })

    test('Overview description are showing corretly informations', async ({ page }) => {
        await page.fill('[data-test="firstName"]', checkout_fields['firstName'])
        await page.fill('[data-test="lastName"]', checkout_fields['lastName'])
        await page.fill('[data-test="postalCode"]', checkout_fields['postalCode'])
        await page.click('[data-test="continue"]')

        const item_name = page.locator('[data-test="inventory-item-name"]') 
        const item_value = page.locator('[data-test="inventory-item-price"]')
        const item_subtotal = page.locator('[data-test="subtotal-label"]')
        const item_tax = page.locator('[data-test="tax-label"]')
        const item_total = page.locator('[data-test="total-label"]')
        await expect(item_name).toContainText("Sauce Labs Backpack")
        await expect(item_value).toContainText("$29.99")
        await expect(item_subtotal).toContainText("$29.99")
        await expect(item_tax).toContainText("$2.40")
        await expect(item_total).toContainText("$32.39")
    })
})
