import { test, expect } from '@playwright/test'
import { loginAs } from '../actions/LoginActions'



test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user', 'secret_sauce')
})

test.describe('items functions', () => {
    test('Enter item details', async ({ page }) => {
        await page.click('[data-test="inventory-item-name"]')

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=4")
    })

    test('Add item to shopping cart', async ({ page }) => {
        await test.step('update cart', async () =>{
            await page.click('[data-test="add-to-cart-sauce-labs-backpack"]')

            const cartBadge = page.locator('.shopping_cart_badge')
            await expect(cartBadge).toHaveText('1')
        })

        await test.step('verify shopping cart page', async () =>{
            await page.click('[data-test="shopping-cart-link"]')

            const item = page.locator('[data-test="inventory-item"]')
            const item_name = page.locator('[data-test="inventory-item-name"]')     
            await expect(item).toBeVisible()
            await expect(item_name).toContainText("Sauce Labs Backpack")
        })    
    })

    test('Remove item from cart', async ({ page }) => {

        await test.step('update cart', async() => {
            await page.click('[data-test="add-to-cart-sauce-labs-backpack"]')
            const cartBadge = page.locator('.shopping_cart_badge')
            await page.click('[data-test="remove-sauce-labs-backpack"]')
            await expect(cartBadge).toBeHidden()
        })
            
        await test.step('verify Shopping cart page', async() => {
            await page.click('[data-test="shopping-cart-link"]')
            const item = page.locator('[data-test="inventory-item"]')
            await expect(item).toBeHidden()
        })
    })
})

test.describe('items filter functions', () => {
    test('Sort items by price(asc)', async ({ page }) => {
        await page.selectOption('[data-test="product-sort-container"]', "lohi")
        
        const priceElements = await page.locator('.inventory_item_price').allTextContents()
        const prices = priceElements.map(price => parseFloat(price.replace('$', '')))

        const sortedPrices = [...prices].sort((a, b) => a - b)
        expect(prices).toEqual(sortedPrices)
    })

    test('Sort items by price(desc)', async ({ page }) => {
        await page.selectOption('[data-test="product-sort-container"]', "hilo")

        const priceElements = await page.locator('.inventory_item_price').allTextContents()
        const prices = priceElements.map(price => parseFloat(price.replace('$', '')))

        const sortedPrices = [...prices].sort((a, b) => b - a)
        expect(prices).toEqual(sortedPrices)
    })
})
