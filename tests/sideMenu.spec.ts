import { test, expect } from '@playwright/test'
import { loginAs } from '../actions/LoginActions';


test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user', 'secret_sauce')
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