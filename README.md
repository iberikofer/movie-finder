# 🎬 Movie Finder (Next.js)

A high-performance, modern, and responsive web application for discovering trending movies and TV series, searching titles with debounced querying, exploring films via an interactive multi-filter suite, managing a personal watchlist, and viewing rich filmography details with an interactive photo lightbox, official trailers and clips hub, streaming watch providers, and custom community analytics.

Powered by [The Movie Database (TMDB) API](https://www.themoviedb.org/) and built with **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, and **Vanilla CSS Modules**.

> 🇺🇦 **Українська версія документації:** [Перейти до опису українською мовою](#-movie-finder-українська-версія) (див. нижче).

---

## ✨ Features & Key Highlights

### 🚀 1. Next.js App Router Architecture
- **Next.js 16 App Router**: Modern directory-based routing (`/`, `/movies`, `/trending`, `/saved`, `/movies/[movieId]`) with nested layouts, streaming, and error/not-found boundaries.
- **Cleaned Bloatware**: Removed legacy CRA leftovers, Workbox PWA service-worker bloat, unused bundle packages (`ajv`, `react-loader-spinner`), and redundant build configs for a minimal and blazing-fast footprint.
- **Turbopack & Lightning-Fast HMR**: Instant local server startup and reactive code updates.
- **Server & Client Component Synergy**: Optimized client components with explicit `'use client'` boundaries and zero unnecessary client JavaScript payload.

### 🌐 2. Full Bilingual Localization (`EN` / `UA`)
- **Zero-Reload Instant Switching**: Toggle between English and Ukrainian (`EN` / `UA`) via a dedicated navbar switch button featuring a stylized Ukrainian flag motif. All UI strings across pages, badges, rating breakdowns, tooltips, dialogs, and filters update instantaneously without requiring a page reload or resetting scroll positions.
- **100% Comprehensive Coverage**: Complete end-to-end localization across all views (Home, Trending, Movies, Saved, Details, 404), components, modal dialogs, age rating badges, critics reviews, and similar titles counters.
- **Adaptive Data Re-fetching**: Automatically retrieves Ukrainian localized overviews and media metadata (`language=uk-UA`) from TMDB in the background while keeping the interface snappy and reactive.

### 🏠 3. Interactive Landing Page (`/`)
- Comprehensive project showcase highlighting core architecture, metrics, and technology stack.
- Real-time project statistics and quick-access navigation to Trending, Search, and Watchlist.

### 🔖 4. Personal Saved Watchlist (`/saved`)
- **One-Click Bookmarking**: Circular glassmorphism bookmark buttons (`SaveMovieButton`) available on every card poster in grids and directly beside the title in the Movie Details header.
- **Live Navbar Badge**: Reactive counter badge in the main navigation showing the total count of saved titles in real time.
- **Smart Category Filtering**: Seamlessly filter saved items by `All`, `🎬 Movies`, or `📺 Series`.
- **Safe Clear Watchlist**: Two-step confirmation state (`Confirm Clear All`) to prevent accidental deletions.
- **Clean Empty State**: Centered zero-state screen with direct calls-to-action to Trending and Search.

### 🔥 5. Trending Feed & Discovery (`/trending`)
- Discover what millions are watching today with real-time TMDB trending feeds.
- **Format Identification Badges**: Dedicated visual badges for `🎬 MOVIE` (emerald) vs `📺 SERIES` (violet) across card posters and details.
- **Integrated FilterBar**: Filter trending content dynamically by format, genre, age rating, and sorting order.
- Smooth pagination with interactive **"Load More Titles"** controls.

### 🎛️ 6. Unified Interactive FilterBar Suite
- **Media Format Selector**: Instant switching between `🍿 All Types`, `🎬 Movies`, and `📺 TV Series`.
- **Centered Multi-Genre Selector with Modal**: Pick one or multiple genres with centered pill badges (`width: 225px`) preventing text truncation on long localized names, and a centered `Done` button.
- **Age Certifications**: Granular ratings mapping (`0+`, `6+`, `12+`, `16+`, `18+`) with US certification mappings (`G`, `PG`, `PG-13`, `R`, `NC-17` / `TV-Y`, `TV-PG`, `TV-14`, `TV-MA`).
- **Multi-Criteria Sorting**:
  - `🔥 Most Popular` (Default)
  - `⭐ Highest Rated`
  - `📅 Newest First`
  - `🔤 Title (A-Z)` *(English locale only)*
  - `🔤 Title (Z-A)` *(English locale only)*
  - Saved-specific sorts: `🕒 Date Added (Newest)`, `⏳ Date Added (Oldest)`, `📅 Release Date`.
- **Note on Alphabetical Sorting in Ukrainian**:
  > ℹ️ Due to TMDB database specifics where titles are not fully localized into Ukrainian (many titles remain in English or their original languages, leading to mixed-language ordering), **alphabetical sorting (`A-Z` / `Z-A`) is intentionally excluded in the Ukrainian interface** to prevent inconsistent sorting results. In English, both `A-Z` and `Z-A` sorting modes remain fully available.

### 🔍 7. Instant Search & Discovery (`/movies`)
- **Expanded Search Block (1000px)**: Wide, comfortable search container accommodating multi-filter Ukrainian labels without truncation.
- **Live Debounced Search**: 1500ms debounced input to prevent redundant API queries while typing.
- **Grid Row Alignment**: Smart card slicing ensures incomplete grid rows are never shown prematurely.
- **Shareable URL Parameters**: Search query and active filters are synchronized to the URL (`?query=...&genres=...&type=...&age=...&sort=...`) for instant sharing and bookmarking.
- **Jitter-Free Loading**: Guaranteed 500ms minimum threshold prevents fast network requests from flashing micro-loaders.

### 🧭 8. Session-Based State & Scroll Restoration
- **Zero Loss Navigation**: If you load multiple pages via "Load More" (e.g. 60 titles) and scroll down to a specific item, clicking a card to view details and clicking "Go back" immediately restores your accumulated movies, current page, and exact scroll position.
- **Optimized Header Routing**: Navigation router detects saved scroll positions and avoids jarring flickers to top.
- **Per-Filter Isolation**: Changing any filter or search term cleanly restarts the session from page 1 at the top.

### ⭐ 9. Precision Critics Score & Rating Analytics
- **Dual Scoring Architecture**: Toggle between TMDB's global 10-point score and a bespoke 5-star community analytics engine.
- **0.5-Star Precision Input**: Rate movies with fine-grained half-star increments (`StarRatingInput`).
- **Dynamic Color Feedback**: Emerald (high praise), Amber (average), and Rose (critique).
- **Rating Distribution Analytics**: Visual distribution chart of user ratings inside the Movie Details sub-navigation.
- **Global & Individual Reset**: Reset ratings on specific titles or perform a full global wipe with safe confirmation and smooth button transitions.

### 📸 10. Cinematic Media Hub & Photo Lightbox (`/movies/[movieId]`)
- **Fullscreen Photo Lightbox (`MovieGallery`)**: Interactive backdrop and production stills gallery with keyboard navigation (`Esc` to close, `←` / `→` arrows to navigate), image load fade-ins, and an image counter.
- **Smooth Image Loader**: 500ms minimum loader duration prevents flicker when browsing cached photos.
- **Smooth Sub-Tab Switching**: Switching between tabs (Ratings, Cast, Videos, Info, Reviews, Similar) updates the content in-place without triggering full-page loaders or scrolling to the top.
- **Interactive Multi-Video Hub (`/movies/[movieId]/videos`)**: Embedded YouTube video player with an interactive clip selector chip bar. Automatically organizes media into Trailers, Teasers, Behind the Scenes, Clips, and Featurettes with item count badges, localized title heuristics, and intelligent fallback to the movie's original release videos when localized dubs are unavailable in TMDB.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | Vanilla CSS Modules (`*.module.css`) + CSS Custom Properties |
| **Data Provider** | [The Movie Database (TMDB) API](https://developer.themoviedb.org/) |
| **Fonts** | `next/font/google` ([Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20 or higher (v22/v24 recommended)
- **npm**: v10 or higher
- **TMDB API Read Access Token (v4 Bearer Token)**: Obtain a free API Read Access Token at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

### 1. Clone & Install
```bash
git clone https://github.com/iberikofer/movie-finder.git
cd movie-finder
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_TMDB_TOKEN=your_tmdb_bearer_token_here
```
*(A fallback token is pre-configured for instant demonstration).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

<br />

# 🎬 Movie Finder (Українська версія)

Високопродуктивний, сучасний та адаптивний веб-додаток для пошуку й перегляду популярних фільмів та серіалів, розширеного пошуку з відкладеним введенням (debounce), інтерактивного блоку багатопараметричної фільтрації, персонального списку збереженого та детальної фільмографії з інтерактивною фотогалереєю lightbox, відеоплеєром трейлерів і кліпів, списком стрімінгових платформ та аналітикою користувацьких оцінок.

Працює на основі [The Movie Database (TMDB) API](https://www.themoviedb.org/) та побудований на **Next.js 16 (App Router)**, **React 19**, **TypeScript 5** та **CSS Modules**.

---

## ✨ Основні можливості

### 🚀 1. Архітектура Next.js App Router
- **Next.js 16 App Router**: Сучасна файлова маршрутизація (`/`, `/movies`, `/trending`, `/saved`, `/movies/[movieId]`), вкладені макети (nested layouts), плавна навігація та оптимізовані клієнтські компоненти (`'use client'`).
- **Очищення блотвер-коду**: Видалено застарілі залишки CRA, Service Worker / Workbox PWA блотвер, невикористовувані залежності (`ajv`, `react-loader-spinner`) та надлишкові конфігурації для максимальної швидкості та чистоти коду.
- **Turbopack**: Блискавичний запуск сервера та миттєвий Hot Module Replacement (HMR).

### 🌐 2. Повна двомовна локалізація (`UA` / `EN`)
- **Миттєве перемикання без перезавантаження сторінки**: Зручна кнопка у формі стилізованого прапора України в навігаційній панелі миттєво змінює мову інтерфейсу для всіх елементів, бейджів, відгуків, фільтрів та модальних вікон.
- **Адаптивне оновлення даних**: Фонове отримання українських синопсисів та метаданих фільмів (`language=uk-UA`) з TMDB.

### 🏠 3. Інтерактивна головна сторінка (`/`)
- Презентація архітектури, технологічного стека та ключових метрик проєкту.
- Швидкий перехід до трендів, пошуку та списку збереженого.

### 🔖 4. Персональний список збереженого (`/saved`)
- **Збереження в один клік**: Кнопки-закладки зі скляним ефектом (`SaveMovieButton`) на кожній картці та біля назви на сторінці фільму.
- **Індикатор кількості в шапці**: Лічильник у реальному часі відображає кількість збережених тайтлів з плавною анімацією.
- **Фільтрація за типом**: `Всі`, `🎬 Фільми`, `📺 Серіали`.
- **Безпечне очищення**: Двоетапне підтвердження (`Підтвердити очищення`) для захисту від випадкового видалення.

### 🔥 5. Стрічка трендів (`/trending`)
- Щоденні світові тренди TMDB.
- Візуальні бейджі формату: `🎬 ФІЛЬМ` (смарагдовий) та `📺 СЕРІАЛ` (фіолетовий).
- Повна інтеграція з фільтрами та пагінація з кнопкою **«Завантажити ще»**.

### 🎛️ 6. Універсальна панель фільтрації (FilterBar)
- **Формат контенту**: `🍿 Усі типи`, `🎬 Фільми`, `📺 Серіали`.
- **Жанровий селектор**: Модальне вікно з пігулками жанрів шириною 225px, що усуває обрізання довгих назв.
- **Вікові рейтинги**: Градація `0+`, `6+`, `12+`, `16+`, `18+` з відповідністю американським сертифікаціям TMDB (`G`, `PG`, `PG-13`, `R`, `NC-17`).
- **Сортування**: За популярністю, рейтингом, датою релізу та назвою.
  > ℹ️ *Сортування за алфавітом в українській версії вимкнено через специфіку бази даних TMDB, де значна частина назв залишається англійською, що порушує алфавітний порядок.*

### 🔍 7. Пошук з відкладеним запитом (`/movies`)
- Широкий блок пошуку (1000px) без перенесення тексту.
- Debounce-інтервал 1500мс для запобігання зайвим API-запитам.
- Синхронізація параметрів пошуку з URL для збереження та шерінгу посилань.

### 🧭 8. Збереження сесії та відновлення скролу
- **Повна відсутність втрати прогресу**: Якщо завантажити кілька сторінок і перейти до деталей фільму, кнопка «Назад» повертає до списку фільмів з точним відновленням позиції скролу та завантажених сторінок.

### ⭐ 9. Власна система оцінювання Critics Score
- Оцінювання фільмів за 5-зірковою шкалою з кроком 0.5 зірки.
- Кольорова диференціація (смарагдовий, бурштиновий, трояндовий).
- Графік розподілу оцінок у вкладці деталей фільму.
- Можливість індивідуального скидання або повного очищення оцінок.

### 📸 10. Медіа-центр та галерея Lightbox (`/movies/[movieId]`)
- Повноекранна галерея постерів та кадрів зі зйомок з підтримкою клавіатури (`Esc`, `←`, `→`).
- Вбудований відеоплеєр YouTube з категоризацією (Трейлери, Тизери, Бекстейдж, Уривки).
- Плавне перемикання вкладок (Оцінки, Інфо, Відео, Актори, Відгуки, Схожі) без мерехтіння сторінки.

---

## 🛠️ Технологічний стек

- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript 5 (Strict Mode)**
- **CSS Modules + CSS Custom Properties**
- **The Movie Database (TMDB) API**
- **next/font/google (Plus Jakarta Sans)**
- **Vercel**

---

## 🚀 Запуск проєкту

### 1. Клонування та встановлення
```bash
git clone https://github.com/iberikofer/movie-finder.git
cd movie-finder
npm install
```

### 2. Налаштування змінних оточення
Створіть файл `.env.local` у корені проєкту:
```env
NEXT_PUBLIC_TMDB_TOKEN=ваш_токен_tmdb_api
```

### 3. Запуск сервера розробки
```bash
npm run dev
```
Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

### 4. Збірка для продакшену
```bash
npm run build
npm run start
```
