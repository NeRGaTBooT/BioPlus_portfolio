# БиоПлюс — каталог лабораторной продукции

Статический сайт-каталог [bioplus.by](https://bioplus.by): продукция, партнёры, команда, PDF-каталоги.

## Стек

| Технология | Назначение |
|------------|------------|
| [Astro 5](https://astro.build/) | Статическая генерация страниц |
| TypeScript | Типизация данных и схем |
| Tailwind CSS 4 | Адаптивный UI |
| YAML | Контент как код (товары, партнёры, команда) |
| [Pagefind](https://pagefind.app/) | Полнотекстовый поиск |
| GitHub Actions | Сборка и публикация на GitHub Pages |

## Локальная разработка

```bash
git clone https://github.com/<ваш-username>/bioplus.git
cd bioplus
npm install
npm run dev
```

Сайт откроется на `http://localhost:4321/bioplus/`.

### Сборка и превью

```bash
npm run build
npm run preview
```

## Добавление товара

1. Откройте YAML-файл нужной категории в `src/data/products/`:

   ```
   src/data/products/chemical-reagents.yaml
   src/data/products/glassware.yaml
   src/data/products/culture-media.yaml
   src/data/products/equipment.yaml
   src/data/products/furniture.yaml
   src/data/products/chromatography.yaml
   ```

2. Добавьте запись в конец файла:

   ```yaml
   - id: my-product-id
     name: "Название товара"
     category: chemical-reagents
     subcategory: acids
     manufacturer: "Производитель"
     inStock: true
     description: "Краткое описание."
   ```

3. Проверьте, что `category` и `subcategory` существуют в `src/data/categories.yaml`.

4. Сделайте `git push` — GitHub Actions пересоберёт сайт.

Страница товара появится по адресу `/products/item/my-product-id`.

## Структура данных

```
src/
├── data/
│   ├── site.yaml           # Контакты, реквизиты, навигация
│   ├── categories.yaml     # Дерево категорий
│   ├── products/*.yaml     # Товары по категориям
│   ├── partners.yaml
│   ├── clients.yaml
│   ├── team.yaml
│   └── catalogs.yaml
├── content/pages/          # Markdown-страницы (О компании, Условия)
└── pages/                  # Маршруты Astro
```

## Публикация на GitHub Pages

### 1. Создайте репозиторий

На GitHub создайте репозиторий `bioplus` (или другое имя — тогда измените `base` в конфиге).

### 2. Настройте URL в Astro

В `astro.config.mjs` укажите ваш GitHub username и имя репозитория:

```js
site: 'https://<ваш-username>.github.io',
base: '/bioplus',
```

Если репозиторий называется `<username>.github.io` (сайт в корне), используйте `base: '/'`.

### 3. Включите GitHub Pages

В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### 4. Загрузите код

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<ваш-username>/bioplus.git
git push -u origin main
```

После push workflow `.github/workflows/deploy.yml` автоматически соберёт проект (`npm ci` → `npm run build`) и опубликует папку `dist` на GitHub Pages.

Сайт будет доступен по адресу: `https://<ваш-username>.github.io/bioplus/`

### Проверка деплоя

- Вкладка **Actions** — статус workflow «Deploy to GitHub Pages»
- **Settings → Pages** — ссылка на опубликованный сайт

## Маршруты

| URL | Страница |
|-----|----------|
| `/` | Главная |
| `/products` | Обзор категорий |
| `/products/[category]` | Категория |
| `/products/[category]/[subcategory]` | Список товаров |
| `/products/item/[id]` | Карточка товара |
| `/about`, `/terms`, `/contacts` | Статические страницы |
| `/team`, `/partners`, `/clients`, `/catalogs` | Справочники |

## Лицензия

Контент принадлежит ООО «БиоПлюс».
