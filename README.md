# Портфолио · Иван (Alphastatex)

Минималистичная страница-визитка в стиле редакционного дизайна (Editorial Minimalism). Философия - безопасная разработка, сложный интерактива и CI/CD.

**Live:** [https://alphastatex.github.io/portfolio/](https://alphastatex.github.io/portfolio/)

## 🚀 Фишки и Интерактив

В проекте реализованы премиальные микровзаимодействия без использования тяжелых фреймворков:

- 🎯 **Кастомный курсор:** Квадратная рамка с эффектом `mix-blend-mode: difference`. Реагирует на интерактивные элементы (сжатие/расширение).
- 🌊 **Кинетическая бегущая строка:** Две строки с типографическим контрастом. Скорость и наклон (skew) зависят от скорости скролла пользователя (GSAP ScrollTrigger).
- 🖼️ **Ховеры карточек:** Плавный переход из ч/б в цвет с легким зумом и появлением тени.
- 🧲 **Магнитные кнопки:** Элементы слегка притягиваются к курсору при наведении.
- 📜 **Плавный скролл:** Кастомная реализация прокрутки к якорям с учетом фиксированной навигации.

## 📂 Проекты

- ☕ **[Кофейня Омбре](https://alphastatex.github.io/ombre-coffee/)** — лендинг с системой бронирования, CRM-админкой и Telegram-ботом. Защита Zero Trust, Cloudflare Turnstile.
- 💈 **[Барбершоп BRUTAL STYLE](https://alphastatex.github.io/barbershop/)** — бруталистичный лендинг с Telegram Mini App и защитой форм от спама.
- 🎮 **[NEON ARENA](https://alphastatex.github.io/neon-arena/)** — продающий лендинг киберспортивного клуба. Премиум-интерактив: Canvas 2D частицы, Web Audio API, кастомный курсор, GSAP ScrollTrigger.

## 🛠 Стек

- **Frontend:** HTML5 / CSS3, Vanilla JS (ES6+), TypeScript (JSDoc), GSAP (ScrollTrigger).
- **Backend & Security:** Cloudflare Workers, Cloudflare KV, Cloudflare Turnstile, Telegram Bot API, Zero Trust (HMAC-SHA256).
- **Tools & Deploy:** Git, GitHub Actions (CI/CD), Vitest, Playwright, Wrangler.

## ⚙️ Деплой

Статика размещена на GitHub Pages. Автоматизация сборки и деплоя настроена через GitHub Actions (срабатывает при пуше в ветку `main`).
