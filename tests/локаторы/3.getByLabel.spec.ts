import { test, expect } from '@playwright/test';

test.describe('Базовые тесты для getByLabel()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbylabel');
  });

  // Задание 1: Найди поле "Имя пользователя" по связанной метке
  // Заполни поле значением "test_user" и проверь значение
  test('Найти текстовое поле по label', async ({ page }) => {
    const username = page.getByLabel('Имя пользователя');
      await username.fill('test_user');
    await expect(username).toHaveValue('test_user');
  });

  // Задание 2: Найди поле email по метке "Электронная почта"
  // Проверь что placeholder содержит "example@mail.com"
  test('Найти email поле по label', async ({ page }) => {
    const email = page.getByLabel('Электронная почта');
      await expect(email).toHaveAttribute('placeholder', 'example@mail.com');
  });
});
test.describe('Тесты для чекбоксов и радиокнопок', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbylabel');
  });

  // Задание 1: Найди чекбокс "Музыка" по метке и проверь что он выбран
  // Затем сними выбор и проверь снова
  test('Работа с чекбоксами', async ({ page }) => {
    const musicCheckbox = page.getByLabel('Музыка');
      await expect(musicCheckbox).toBeChecked();
    await musicCheckbox.uncheck();
    await expect(musicCheckbox).not.toBeChecked();
  });

  // Задание 2: Найди радиокнопку "Женский" по метке и проверь выбор
  // Затем выбери "Мужской" и проверь изменения
  test('Работа с радиокнопками', async ({ page }) => {
    const femaleRadio = page.getByLabel('Женский');
      await expect(femaleRadio).toBeChecked();

    await page.getByLabel('Мужской').check();
    await expect(femaleRadio).not.toBeChecked();
  });
});

test.describe('Сложные случаи для getByLabel()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbylabel');
  });

  // Задание 1: Найди поле телефона по тексту внутри label
  // Проверь что placeholder содержит шаблон телефона
  test('Найти поле по тексту внутри label', async ({ page }) => {
    const phone = page.getByLabel('Телефон');
    await expect(phone).toHaveAttribute('placeholder', '+7 (XXX) XXX-XX-XX');
  });

  // Задание 2: Найди textarea по ID метки (aria-labelledby)
  test('Найти элемент с aria-labelledby', async ({ page }) => {
    const address = page.getByLabel('Адрес доставки');
      await expect(address).toBeVisible();
  });

  // Задание 3: Найди скрытое поле поиска по label с классом hidden-label
  // Проверь что placeholder содержит "Поиск..."
  test('Найти элемент со скрытым label', async ({ page }) => {
    const search = page.getByLabel('Поиск');
      await expect(search).toHaveAttribute('placeholder', 'Поиск...');
  });
});
