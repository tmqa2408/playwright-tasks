import { test, expect } from '@playwright/test';

test.describe('Базовые тесты для getByAltText()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyalttext');
  });

  // Задание 1: Найди изображение с точным alt-текстом "Красивый пейзаж с горами и озером"
  // Проверь что изображение видимо и имеет правильные размеры
  test('Найти изображение по точному alt-тексту', async ({ page }) => {
    const landscapeImage = page.getByAltText('Красивый пейзаж с горами и озером');
      await expect(landscapeImage).toBeVisible();
  });

  // Задание 2: Найди логотип компании по alt-тексту
  // Проверь что это действительно логотип (содержит слово "логотип" в alt)
  test('Найти логотип компании', async ({ page }) => {
    const logo = page.getByAltText('Логотип компании');
      await expect(logo).toBeVisible();
    await expect(logo).toHaveJSProperty('width', 150);
  });
});

test.describe('Тесты для динамических изображений', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyalttext');
  });

  // Задание 1: Дождись появления динамического изображения и найди его по alt-тексту
  // Проверь что изображение загрузилось с правильными размерами
  test('Найти динамически загруженное изображение', async ({ page }) => {
    const dynamicImage = page.getByAltText('Динамически загруженное изображение');
    await expect(dynamicImage).toBeVisible({ timeout: 2000 });
    await expect(dynamicImage).toHaveJSProperty('width', 250);
  });

  // Задание 2: Найди все изображения с alt-текстом содержащим слово "иконка"
  // Проверь что найдено как минимум 2 таких изображения
  test('Найти все иконки по частичному alt-тексту', async ({ page }) => {
    const icons = page.getByAltText(/иконка/i);
      await expect(icons).toHaveCount(2);
    await expect(icons.first()).toBeVisible();
  });
});
