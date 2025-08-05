import { test, expect } from '@playwright/test'

const user: Record<string, string> = {
  'username': "standard_user",
  'password': "secret_sauce"
}

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', user['username'])
    await page.fill('[data-test="password"]', user['password'])
    await page.click('[data-test="login-button"]')
    await page.click('#react-burger-menu-btn')
})

test.describe("side menu buttons", () => {
    test("enter about page", async({ page }) => {
        await page.click('[data-test="about-sidebar-link"]')

        await expect(page).toHaveURL("https://saucelabs.com/")
    })

    test("click reset app state", async({ page }) => {
        /*
            Tem um pequeno bug no site, quando o botão de reset é clickado
        o botão de remover o item não volta ao botão de adicionar. 
            Os codigos comentados a baixo seriam referentes a esta parte
        */

        await page.click('[data-test="reset-sidebar-link"]')

        const cartBadge = page.locator('.shopping_cart_badge')
        //const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        await expect(cartBadge).toBeHidden()
        //await expect(addToCartButton).toBeVisible()
    })

    test("click on button to cross side menu", async({ page }) => {
        await page.click('#react-burger-cross-btn')

        const sideMenu = page.locator('.bm-menu')
        await expect(sideMenu).toBeHidden()
    })
})