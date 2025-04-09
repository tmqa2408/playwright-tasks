import { test, expect } from '@playwright/test';

test.describe('Продвинутые CSS-селекторы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/locator_css');
  });

  test('Комбинированные условия поиска', async ({ page }) => {
    // 1. Найти карточку товара, которая:
    //    - Имеет класс featured
    //    - Содержит текст "Смартфон"
    //    - Цена меньше 50 000 ₽
    const featuredSmartphone = page.locator(
      '.product-card.featured:has-text("Смартфон") .price-value',
    );
    await expect(featuredSmartphone).toHaveText('49 999');

    // 2. Найти кнопку в форме, которая:
    //    - Является прямой дочерней элементом формы
    //    - Имеет класс btn и submit-btn
    //    - Не disabled
    const submitButton = page.locator('#registration-form > .btn.submit-btn:not([disabled])');
    await expect(submitButton).toBeEnabled();

    // 3. Найти input, который:
    //    - Находится в форме
    //    - Имеет type="email"
    //    - Имеет placeholder, содержащий "example"
    const emailInput = page.locator(
      '#registration-form input[type="email"][placeholder*="example"]',
    );
    await expect(emailInput).toHaveId('email');
  });

  test('Сложные псевдоклассы', async ({ page }) => {
    // 1. Найти строку таблицы, где:
    //    - Email содержит "ivan"
    //    - Статус активен
    const activeIvanRow = page.locator(
      '#user-table tr:has(td.status-active):has(td:has-text("ivan"))',
    );
    await expect(activeIvanRow).toContainText('Иван Иванов');

    // 2. Найти все товары, которые:
    //    - Не имеют класса sold-out
    //    - Цена больше 30 000 ₽
    const expensiveAvailable = page.locator(
      '.product-card:not(.sold-out) .price-value:has-text("99")',
    );
    await expect(expensiveAvailable).toHaveText('99 999');
  });
});

test.describe('Динамический контент с условиями', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Фильтрация динамических элементов', async ({ page }) => {
    // 1. Дождаться появления динамической кнопки, которая:
    //    - Имеет класс disabled
    //    - Содержит текст "Недоступно"
    //    - Не имеет атрибута type="submit"
    const dynamicButton = page.locator(
      '#dynamic-content .btn.disabled:has-text("Недоступно"):not([type="submit"])',
    );
    await expect(dynamicButton).toBeVisible({ timeout: 2000 });

    // 2. Найти динамический товар, который:
    //    - Цена меньше 10 000 ₽
    //    - Не является рекомендуемым (featured)
    const cheapProduct = page.locator(
      '#dynamic-content .product-card:not(.featured) .price-value:has-text("9")',
    );
    await expect(cheapProduct).toHaveText('9 999');
  });

  test('Комбинации с :has и :not', async ({ page }) => {
    // 1. Найти все карточки, которые:
    //    - Не имеют статуса sold-out
    //    - Содержат кнопку с текстом "В корзину"
    const availableProducts = page.locator(
      '.product-card:not(.sold-out):has(.btn:has-text("В корзину"))',
    );
    await expect(availableProducts).toHaveCount(2);

    // 2. Найти ячейки таблицы, которые:
    //    - В строках с активными пользователями
    //    - Не являются ячейками с email
    const activeUserCells = page.locator(
      '#user-table tr:has(.status-active) td:not(:nth-child(3))',
    );
    await expect(activeUserCells).toHaveCount(3); // ID, Имя, Статус
  });
});

test.describe('Экстремальные условия поиска', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Сложные комбинации селекторов', async ({ page }) => {
    // 1. Найти элемент, который:
    //    - Является последним product-card в секции basic-selectors
    //    - Не имеет класса featured
    //    - Содержит цену между 30 000 и 100 000 ₽
    const lastBasicProduct = page.locator(
      '#basic-selectors .product-card:not(.featured):last-child .price-value',
    );
    await expect(lastBasicProduct).toHaveText('99 999');

    // 2. Найти input, который:
    //    - Видимый
    //    - Не disabled
    //    - Имеет соседний label с текстом "Email"
    const emailInput = page.locator(
      'input:visible:not([disabled]) + label:has-text("Email") + input',
    );
    await expect(emailInput).toHaveId('email');

    // 3. Найти строку таблицы, где:
    //    - Статус неактивен
    //    - Email заканчивается на "example.com"
    //    - Имя содержит пробел
    const inactiveUserRow = page.locator(
      '#user-table tr:has(.status-inactive):has(td:nth-child(3):has-text(/example.com$/):has(td:nth-child(2):has-text(" "))',
    );
    await expect(inactiveUserRow).toContainText('Петр Петров');
  });

  test('Селекторы с регулярными выражениями', async ({ page }) => {
    // 1. Найти элементы, где:
    //    - Класс начинается с "product-"
    //    - Текст цены содержит ровно 5 цифр
    const productPriceElements = page.locator(
      '[class^="product-"] [class*="price"]:has-text(/\\d{5}/)',
    );
    await expect(productPriceElements).toHaveCount(2);

    // 2. Найти кнопки, которые:
    //    - Не содержат слово "Недоступно"
    //    - Текст начинается с "В корзину" или "Зарегистрироваться"
    const activeButtons = page.locator(
      '.btn:not(:has-text("Недоступно")):has-text(/^(В корзину|Зарегистрироваться)/)',
    );
    await expect(activeButtons).toHaveCount(3);
  });
});
