import { test, expect } from '@playwright/test';

test.describe('Фильтрация кнопок с getByRole', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/locator_filter');
  });

  // Задание 1: Найти все кнопки и отфильтровать неактивные
  test('Фильтрация неактивных кнопок', async ({ page }) => {
    const allButtons = page.getByRole('button');
    const disabledButtons = allButtons.filter({
      has: page.getByRole('button', { disabled: true }),
    });

    await expect(disabledButtons).toHaveCount(1);
    await expect(disabledButtons).toHaveText('Неактивная кнопка');
  });

  // Задание 2: Найти все элементы с ролью button и отфильтровать нажатые
  test('Фильтрация нажатых кнопок', async ({ page }) => {
    const allButtonElements = page.getByRole('button');
    const pressedButtons = allButtonElements.filter({
      has: page.getByRole('button', { pressed: true }),
    });

    await expect(pressedButtons).toHaveCount(1);
    await expect(pressedButtons).toHaveText('Нажатая кнопка');
  });
});

test.describe('Фильтрация форм с getByLabel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/filter');
  });

  // Задание 1: Найти все поля email и отфильтровать активные
  test('Фильтрация активных email полей', async ({ page }) => {
    const allEmailFields = page.getByLabel(/Email/);
    const activeEmailFields = allEmailFields.filter({
      hasNot: page.getByRole('textbox', { disabled: true }),
    });

    await expect(activeEmailFields).toHaveCount(1);
    await expect(activeEmailFields).toHaveAttribute('placeholder', 'email1@example.com');
  });

  // Задание 2: Найти все input элементы и отфильтровать по placeholder
  test('Фильтрация по placeholder', async ({ page }) => {
    const allInputs = page.getByRole('textbox');
    const email2Inputs = allInputs.filter({
      has: page.getByPlaceholder('email2@example.com'),
    });

    await expect(email2Inputs).toHaveCount(1);
    await expect(email2Inputs).toBeDisabled();
  });
});

test.describe('Комплексная фильтрация с разными локаторами', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/filter');
  });

  // Задание 1: Найти все параграфы и отфильтровать содержащие "особый текст"
  test('Фильтрация параграфов по тексту', async ({ page }) => {
    const allParagraphs = page.getByRole('paragraph');
    const specialParagraphs = allParagraphs.filter({
      has: page.getByText('особый текст'),
    });

    await expect(specialParagraphs).toHaveCount(1);
    await expect(specialParagraphs).toContainText('Первый параграф');
  });

  // Задание 2: Дождаться динамического контента и отфильтровать по title
  test('Фильтрация динамического контента', async ({ page }) => {
    const dynamicContainer = page.locator('#dynamic-content');
    await expect(dynamicContainer).toBeVisible();

    const allElements = dynamicContainer.getByRole('paragraph');
    const titledElements = allElements.filter({
      has: page.getByTitle('динамический текст'),
    });

    await expect(titledElements).toHaveCount(1);
    await expect(titledElements).toHaveText('Динамически добавленный текст');
  });

  // Задание 3: Комбинированная фильтрация с getByTestId
  test('Фильтрация по test-id и тексту', async ({ page }) => {
    const allTestIdElements = page.getByTestId(/.*/);
    const specialTextElements = allTestIdElements.filter({
      hasText: 'Уникальный текст',
    });

    await expect(specialTextElements).toHaveCount(1);
    await expect(specialTextElements).toHaveAttribute('data-testid', 'special-text');
  });
});
