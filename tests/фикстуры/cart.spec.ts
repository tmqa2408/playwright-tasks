import { test as base, expect, Page } from '@playwright/test';

interface CartFixtures {
  preloadedCart: Page;
}
// Нужно реализовать фукстуру preloadedCart
// Отркрыть страницу https://osstep.github.io/fixture_cart
// Нажать кнопку добавления товаров
// Заполнить поле пароль admin123
// Авторизоваться
export const test = base.extend<CartFixtures>({
  preloadedCart: async ({ page }, use) => {},
});

test('Cart contains sample items', async ({ preloadedCart }) => {
  await expect(preloadedCart.locator('.empty-cart')).not.toBeVisible();
  await expect(preloadedCart.locator('.cart-item')).toHaveCount(2);
  await expect(preloadedCart.locator('text=Wireless Headphones')).toBeVisible();
  await expect(preloadedCart.locator('text=Smart Watch')).toBeVisible();
});
