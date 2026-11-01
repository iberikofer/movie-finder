# 🎬 React Movie Finder

A high-performance, modern, and responsive web application for discovering trending movies and TV series, searching titles with debounced querying, exploring films via an interactive multi-filter suite, managing a personal watchlist, and viewing rich filmography details with an interactive photo lightbox, official trailers and clips hub, streaming watch providers, and custom community analytics. Powered by [The Movie Database (TMDB) API](https://www.themoviedb.org/) and built with React 18, TypeScript 5, and Vite 5.

> 🇺🇦 **Українська версія документації:** [Перейти до опису українською мовою](#-react-movie-finder-українська-версія) (див. нижче).

---

## ✨ Features & Key Highlights

### 🌐 1. Full Bilingual Localization (`EN` / `UA`)
- **Zero-Reload Instant Switching**: Toggle between English and Ukrainian (`EN` / `UA`) via a dedicated navbar switch button featuring a stylized Ukrainian flag motif. All UI strings across pages, badges, rating breakdowns, tooltips, dialogs, and filters update instantaneously without requiring a page reload or resetting scroll positions.
- **100% Comprehensive Coverage**: Complete end-to-end localization across all views (Home, Trending, Movies, Saved, Details, 404), components, modal dialogs, age rating badges, critics reviews, and similar titles counters.
- **Adaptive Data Re-fetching**: Automatically retrieves Ukrainian localized overviews and media metadata (`language=uk-UA`) from TMDB in the background while keeping the interface snappy and reactive.

### ⚡ 2. Vite 5 Next-Generation Architecture
- **Instant Server Startup & HMR**: Powered by Vite 5 with Lightning-fast Hot Module Replacement (HMR).
- **TypeScript 5 Strict Typing**: Complete end-to-end type safety covering TMDB response schemas, filter parameters, rating objects, and session storage states.
- **Modern ESLint 9/10 Flat Config**: Standardized linting rules for React Hooks and TypeScript.

### 📱 3. Progressive Web App (PWA) & Mobile Excellence
- **Offline Caching**: Built with `vite-plugin-pwa` and Workbox, caching static assets and shells for fast offline and low-connectivity loading.
- **Custom Install Prompt (`PWAInstallPrompt`)**: Sleek, non-intrusive banner prompting users to install Movie Finder as a standalone desktop or mobile application.
- **Mobile-First Responsive Layout**: Refined hamburger navigation drawer with backdrop blur, touch-optimized tap targets, and elimination of horizontal scroll or overflow issues.

### 🏠 4. Interactive Landing Page (`/`)
- Comprehensive project showcase highlighting core architecture, metrics, and technology stack.
- Real-time project statistics and quick-access navigation to Trending, Search, and Watchlist.

### 🔖 5. Personal Saved Watchlist (`/saved`)
- **One-Click Bookmarking**: Circular glassmorphism bookmark buttons (`SaveMovieButton`) available on every card poster in grids and directly beside the title in the Movie Details header.
- **Live Navbar Badge**: Reactive counter badge in the main navigation showing the total count of saved titles in real time.
- **Smart Category Filtering**: Seamlessly filter saved items by `All`, `🎬 Movies`, or `📺 Series`.
- **Safe Clear Watchlist**: Two-step confirmation state (`Confirm Clear All`) to prevent accidental deletions.
- **Clean Empty State**: Centered zero-state screen with direct calls-to-action to Trending and Search.

### 🔥 6. Trending Feed & Discovery (`/trending`)
- Discover what millions are watching today with real-time TMDB trending feeds.
- **Format Identification Badges**: Dedicated visual badges for `🎬 MOVIE` (emerald) vs `📺 SERIES` (violet) across card posters and details.
- **Integrated FilterBar**: Filter trending content dynamically by format, genre, age rating, and sorting order.
- Smooth pagination with interactive **"Load More Titles"** controls.

### 🎛️ 7. Unified Interactive FilterBar Suite
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
  > ℹ️ **Please note:** Due to TMDB database specifics where titles are not fully localized into Ukrainian (many titles remain in English or their original languages, leading to mixed-language ordering), **alphabetical sorting (`A-Z` / `Z-A`) is intentionally excluded in the Ukrainian interface** to prevent inconsistent sorting results. In English, both `A-Z` and `Z-A` sorting modes remain fully available.

### 🔍 8. Instant Search & Discovery (`/movies`)
- **Expanded Search Block (1000px)**: Wide, comfortable search container accommodating multi-filter Ukrainian labels without truncation.
- **Live Debounced Search**: 1500ms debounced input to prevent redundant API queries while typing.
- **Grid Row Alignment**: Smart card slicing ensures incomplete grid rows are never shown prematurely.
- **Shareable URL Parameters**: Search query and active filters are synchronized to the URL (`?query=...&genres=...&type=...&age=...&sort=...`) for instant sharing and bookmarking.
- **Jitter-Free Loading**: Guaranteed 500ms minimum threshold prevents fast network requests from flashing micro-loaders.

### 🧭 9. Session-Based State & Scroll Restoration
- **Zero Loss Navigation**: If you load multiple pages via "Load More" (e.g. 60 titles) and scroll down to a specific item, clicking a card to view details and clicking "Go back" immediately restores your accumulated movies, current page, and exact scroll position.
- **Optimized Header Routing**: Navigation router detects saved scroll positions and avoids jarring flickers to top.
- **Per-Filter Isolation**: Changing any filter or search term cleanly restarts the session from page 1 at the top.

### ⭐ 10. Precision Critics Score & Rating Analytics
- **Dual Scoring Architecture**: Toggle between TMDB's global 10-point score and a bespoke 5-star community analytics engine.
- **0.5-Star Precision Input**: Rate movies with fine-grained half-star increments (`StarRatingInput`).
- **Dynamic Color Feedback**: Emerald (high praise), Amber (average), and Rose (critique).
- **Rating Distribution Analytics**: Visual distribution chart of user ratings inside the Movie Details sub-navigation.
- **Global & Individual Reset**: Reset ratings on specific titles or perform a full global wipe with safe confirmation and smooth button transitions.

### 📸 11. Cinematic Media Hub & Photo Lightbox (`/movies/:movieId`)
- **Fullscreen Photo Lightbox (`MovieGallery`)**: Interactive backdrop and production stills gallery with keyboard navigation (`Esc` to close, `←` / `→` arrows to navigate), image load fade-ins, and an image counter.
- **Smooth Image Loader**: 500ms minimum loader duration prevents flicker when browsing cached photos.
- **Smooth Sub-Tab Switching**: Switching between tabs (Ratings, Cast, Videos, Info, Reviews, Similar) updates the content in-place without triggering full-page loaders or scrolling to the top.
- **Interactive Multi-Video Hub (`/movies/:movieId/videos`)**: Embedded YouTube video player with an interactive clip selector chip bar. Automatically organizes media into Trailers, Teasers, Behind the Scenes, Clips, and Featurettes with item count badges, localized title heuristics, and intelligent fallback to the movie's original release videos when localized dubs are unavailable in TMDB.
- **Where to Watch Streaming Providers**: Direct integration with TMDB's Watch Providers API (powered by JustWatch) in the Info tab, showing where titles can be streamed (e.g. Netflix, Apple TV, Megogo), rented, or purchased with verified country-specific provider logos and link-outs.
- **Cast & Crew Directory**: Full cast list with character names and actor profile portraits.
- **Community Reviews & Similar Titles**: Read viewer critiques and explore algorithmic recommendations with quick-save buttons.

### 🎬 12. Custom Clapperboard Loader
- Handcrafted CSS vector clapperboard animation with realistic snap-shut and hold cycles in emerald and cherry tones.
- 0.5s initial stabilization threshold ensures page loads and reloads never stutter with jagged layout shifts.

### 🌊 13. Persistent Ambient Atmosphere
- Continuous 50/50 emerald-and-cherry animated gradient wave composited with GPU acceleration.
- Synchronized to wall-clock Unix epoch time (`Date.now()`), so the ambient wave flows uninterrupted across route transitions and page refreshes.

### 🔄 14. Zero-Latency Cross-Tab Synchronization
- Integrated DOM `CustomEvent` bus paired with window `storage` listeners.
- Rating a movie or adding to your watchlist in one window instantaneously updates open tabs without extra server requests.

### ℹ️ 15. Database Coverage & Incomplete Metadata Disclaimer
- **Upstream Open Community Data**: All titles, plot summaries, cast directories, backdrops, trailers, and production details are queried in real time via the community-maintained [The Movie Database (TMDB)](https://www.themoviedb.org/) API.
- **Coverage & Localization Variance**: Due to the crowdsourced nature and varying global coverage of the TMDB catalog, information for specific movies or TV series (such as full Ukrainian synopses, complete cast rosters, production budgets, age certifications, or localized trailers) may occasionally be incomplete, missing, or available only in the original release language.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18.3** | Functional architecture, Hooks, Context, Suspense, and client-side lifecycle management |
| **TypeScript 5.9** | Strict type safety, interface definitions, and compile-time code quality |
| **Vite 5.2** | Lightning-fast build tool, local dev server with HMR, and optimized production bundler |
| **React Router v6** | Client-side routing, nested routes, dynamic parameters, and URL search param synchronization |
| **Vite PWA & Workbox** | Progressive Web App Service Worker with offline asset caching and custom install prompt |
| **Vanilla CSS Modules** | Scoped, zero-runtime CSS with modern variables, flexbox, CSS Grid, and glassmorphism |
| **TMDB REST API v3** | Real-time movie/show metadata, backdrops, posters, cast, reviews, trailers, and discovery |
| **Custom Language Context** | Instant in-place bilingual localization system (`EN` / `UA`) without page refreshes |
| **SessionStorage API** | State and scroll restoration across multi-page navigation and details views |
| **LocalStorage Event Bus** | Persistent local data layer with cross-tab reactive synchronization |
| **Epoch Wall-Clock Sync** | Epoch-synchronized mathematical ambient wave animation immune to page reloads |
| **HTML5 Modal Lightbox** | Keyboard-accessible modal image viewer with backdrop-filter blur |
| **GitHub Actions & Vercel** | Automated CI/CD build to GitHub Pages and multi-platform Vercel SPA deployment |

---

## 📁 Project Structure

```text
react-movie-finder/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions automated CI/CD deployment
├── public/
│   ├── 404.html                    # GitHub Pages SPA redirect fallback
│   ├── apple-touch-icon.png        # Apple touch icon for iOS PWA
│   ├── favicon.ico                 # Standard browser favicon
│   ├── favicon.svg                 # Scalable vector favicon
│   ├── logo192.png                 # PWA standard icon (192x192)
│   ├── logo512.png                 # PWA high-res icon (512x512)
│   ├── manifest.json               # Web App Manifest definition
│   ├── maskable_icon.png           # Adaptive Android icon
│   └── vercel.json                 # Vercel public routing configuration
├── src/
│   ├── components/
│   │   ├── AgeRatingBadge/         # Certification badges (0+, 6+, 12+, 16+, 18+)
│   │   ├── Cast/                   # Actor profile cards with character names
│   │   ├── CriticsScore/           # 5-star scoring engine, rating distribution, badge & reset
│   │   ├── FilterBar/              # Interactive format, genre, age & sort filter bar
│   │   ├── GenreFilter/            # Multi-genre icon definitions and helpers
│   │   ├── Header/                 # Navigation bar, mobile drawer, logo, saved badge, language switch
│   │   ├── LanguageToggle/         # Interactive EN/UA language switcher button
│   │   ├── Loader/                 # Cinematic animated clapperboard loader
│   │   ├── MediaTypeBadge/         # Film / Series format badges
│   │   ├── MovieDetails/           # Movie details layout, hero banner, sub-nav
│   │   ├── MovieInfo/              # Detailed production, release & streaming providers metadata
│   │   ├── MoviePoster/            # Adaptive movie poster with fallback & fade transitions
│   │   ├── PWAInstallPrompt/       # Progressive Web App installation prompt banner
│   │   ├── Reviews/                # Viewer reviews with dynamic palettes
│   │   ├── SaveMovieButton/        # Circular bookmark button with SVG icons & smooth transitions
│   │   ├── ScrollToTop/            # Frosted floating scroll-to-top button
│   │   ├── SimilarMovies/          # Algorithmic similar titles recommendations
│   │   ├── Videos/                 # Embedded YouTube video hub with multi-clip selector
│   │   └── App.tsx                 # Root application router and route transitions
│   ├── context/
│   │   └── LanguageContext.tsx     # Reactive bilingual context provider & hook
│   ├── hooks/
│   │   ├── useMovieRating.ts       # Hook for managing individual & global film ratings
│   │   └── useSavedMovies.ts       # Watchlist hook with localStorage & event bus
│   ├── pages/
│   │   ├── Home.tsx                # Landing page with architecture & stats
│   │   ├── Movies.tsx              # Debounced search & discovery with session restoration
│   │   ├── Saved.tsx               # Personal watchlist with category filtering
│   │   ├── Trending.tsx            # Trending feed with FilterBar & session restoration
│   │   └── NotFound.tsx            # Custom 404 page
│   ├── translations/
│   │   └── translations.ts         # Central bilingual translation dictionary (EN/UK)
│   ├── types/
│   │   ├── filters.ts              # Filter options, genres, age ratings & sort types
│   │   ├── index.ts                # Centralized types re-export
│   │   ├── ratings.ts              # Types for 5-star critics scoring and analytics
│   │   ├── session.ts              # Session storage and scroll restoration interfaces
│   │   └── tmdb.ts                 # Strong TypeScript type models for TMDB responses
│   ├── utils/
│   │   └── sessionStorage.ts       # Session storage state & scroll restoration helpers
│   ├── fetch.ts                    # TMDB API wrapper functions, caching & endpoints
│   ├── index.css                   # Global tokens, typography & ambient wave
│   ├── index.tsx                   # Application entry point with v7 future flags
│   ├── service-worker.ts           # Custom Workbox service worker for PWA
│   ├── serviceWorkerRegistration.ts# PWA service worker lifecycle registration
│   └── vite-env.d.ts               # Vite client types declaration
├── .editorconfig
├── .env.example                    # Template for environment variables
├── .gitignore
├── .prettierrc.json
├── eslint.config.js                # Flat ESLint config
├── index.html                      # Root HTML template for Vite
├── LICENSE                         # MIT License
├── package.json                    # Project metadata & dependencies
├── tsconfig.json                   # TypeScript compiler configuration
├── vercel.json                     # Vercel deployment configuration
└── vite.config.ts                  # Vite build, aliases, and PWA configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or v20+ recommended)
- **npm** (v9 or newer)

### 1. Clone the repository
```bash
git clone https://github.com/iberikofer/movie-finder.git
cd movie-finder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the provided `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```bash
VITE_TMDB_TOKEN=your_tmdb_bearer_token_here
```
> **Tip:** You can obtain a free API Read Access Token (v4 auth) directly from your [TMDB Account Settings](https://www.themoviedb.org/settings/api). If left unset, the app includes a fallback demo token for immediate testing.

### 4. Run the Development Server
```bash
npm run dev
# or
npm start
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 📜 Available Scripts

- `npm run dev` (or `npm start`) — Starts the Vite development server with instant Hot Module Replacement (HMR) at `http://localhost:5173/`.
- `npm run build` — Type-checks with `tsc` and compiles the optimized production bundle into the `dist/` directory.
- `npm run preview` — Locally previews the compiled production build from `dist/`.
- `npm run type-check` — Runs TypeScript compiler verification (`tsc --noEmit`) to guarantee type safety without emitting files.
- `npm run lint:js` — Runs ESLint across all TypeScript and JavaScript files.

---

## 💡 Acknowledgements & Inspiration

The interactive critics scoring engine and community rating distribution analytics architecture was inspired by and adapted from:
👉 **[iberikofer/feedback-page](https://github.com/iberikofer/feedback-page)** — Customer satisfaction scoring and interactive feedback application.

---

## 🌐 Deployment

This application supports seamless multi-platform deployment:
- **GitHub Pages**: Automatically builds, optimizes, and deploys to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`.
- **Vercel**: Fully configured with `vercel.json` for zero-configuration Single Page Application (SPA) routing rewrites.

---
---

# 🇺🇦 React Movie Finder (Українська версія)

Високопродуктивний, сучасний та адаптивний веб-додаток для дослідження популярних фільмів та серіалів, гнучкого пошуку тайтлів, фільтрації за багатьма критеріями, ведення особистого списку перегляду (Watchlist), а також перегляду детальної інформації про фільми з інтерактивною фотогалереєю (лайтбоксом), мульти-відео хабом трейлерів та кліпів, сервісами перегляду та авторською 5-зірковою системою оцінювання критиків. Працює на базі [The Movie Database (TMDB) API](https://www.themoviedb.org/) і побудований на сучасному стеку React 18, TypeScript 5 та Vite 5.

---

## ✨ Основні можливості та особливості

### 🌐 1. Повна двомовна локалізація (`EN` / `UA`)
- **Миттєве перемикання без перезавантаження сторінки**: Зручна кнопка перемикання мови в шапці сайту (`EN` / `UA`) зі стилізованим синьо-жовтим фоном прапора України. Весь інтерфейс (навігація, картки, деталі фільмів, рейтинги, бейджі, модальні вікна та фільтри) оновлюється на льоту зі збереженням поточної позиції прокрутки та завантажених фільмів.
- **100% охоплення перекладом**: Усі сторінки (Головна, Тренди, Пошук, Збережені, Деталі, 404), компоненти, модальні діалоги, вікові рейтинги, розподіл оцінок критиків та повідомлення про помилки повністю перекладені українською мовою.
- **Динамічне завантаження українських даних**: Автоматично звертається до TMDB API з параметром української мови (`language=uk-UA`) для отримання локалізованих синопсисів та назв у фоновому режимі.

### ⚡ 2. Архітектура нового покоління на Vite 5
- **Миттєвий запуск сервера та HMR**: Швидка збірка та блискавичне гаряче оновлення модулів (Hot Module Replacement).
- **Сувора типізація TypeScript 5**: Повний контроль типів для відповідей TMDB, фільтрів, користувацьких рейтингів та сесійного сховища.
- **Новий ESLint Flat Config**: Сучасні правила лінтингу для хуків React та коду TypeScript.

### 📱 3. Прогресивний веб-додаток (PWA) та мобільна адаптивність
- **Офлайн-кешування**: Реалізовано за допомогою `vite-plugin-pwa` та Workbox — статичні ресурси та інтерфейс кешуються для швидкого відкриття навіть за нестабільного зв'язку.
- **Власний банер встановлення (`PWAInstallPrompt`)**: Елегантний банер із пропозицією встановити Movie Finder як автономний застосунок на ПК чи смартфон.
- **Повна мобільна оптимізація**: Адаптивне бургер-меню з ефектом розмиття (backdrop blur), плавні анімації виїзду, зручні розміри кнопок під тачскріни та відсутність горизонтального скролу.

### 🏠 4. Інтерактивна головна сторінка (`/`)
- Презентація ключових можливостей, архітектури проєкту та стеку технологій.
- Статистика бази даних у реальному часі та швидкі переходи до Трендових, Пошуку та Збережених фільмів.

### 🔖 5. Особистий список перегляду (`/saved`)
- **Закладки в один клік**: Стильні круглі кнопки збереження у стилі glassmorphism (`SaveMovieButton`) на кожному постері та біля назви фільму на сторінці деталей.
- **Живий лічильник у шапці**: Інтерактивний бейдж кількості збережених тайтлів, що оновлюється в реальному часі.
- **Фільтрація збережених за категоріями**: Зручний вибір між `Усі`, `🎬 Фільми` та `📺 Серіали`.
- **Безпечне очищення**: Двоетапне підтвердження очищення списку (`Підтвердити очищення`), щоб уникнути випадкового видалення.
- **Приємний порожній стан**: Відцентрований екран із підказками та швидкими кнопками переходу до каталогу.

### 🔥 6. Трендові фільми та серіали (`/trending`)
- Щоденні тренди кіноіндустрії від мільйонів користувачів TMDB у реальному часі.
- **Візуальні бейджі форматів**: Чітке позначення `🎬 ФІЛЬМ` (смарагдовий колір) та `📺 СЕРІАЛ` (фіолетовий колір).
- **Вбудована панель FilterBar**: Динамічна фільтрація трендів за форматом, жанрами, віком та сортуванням.
- Плавне пагінування за допомогою кнопки **«Завантажити більше»**.

### 🎛️ 7. Повнофункціональна панель фільтрів (FilterBar)
- **Вибір формату**: Миттєве перемикання між `🍿 Усі формати`, `🎬 Фільми` та `📺 Серіали`.
- **Центроване модальне вікно вибору жанрів**: Вибір одного або кількох жанрів із розширеними кнопками-бейжами (`225px`), де жодна довга українська назва («Науково-фантастичний», «Політика та війна», «Документальний») не обрізається, та відцентрованою кнопкою `Готово`.
- **Віковий рейтинг**: Точна класифікація (`0+`, `6+`, `12+`, `16+`, `18+`) із мапінгом на сертифікати США (`G`, `PG`, `PG-13`, `R`, `NC-17` / `TV-Y`, `TV-PG`, `TV-14`, `TV-MA`).
- **Критерії сортування**:
  - `🔥 Найпопулярніші` (за замовчуванням)
  - `⭐ Найвищий рейтинг`
  - `📅 Найновіші`
  - Для збережених: `🕒 Спочатку нові додані`, `⏳ Спочатку давні додані`, `📅 Дата виходу`.
- **Важливе уточнення щодо сортування за алфавітом в українській мові**:
  > ℹ️ **Зверніть увагу:** Через особливості бази даних TMDB, де не всі фільми та серіали мають повну українську локалізацію назв (значна частина містить назви англійською або мовою оригіналу, що призводить до змішування мов), **сортування від «А до Я» та від «Я до А» було навмисно прибрано в українській локалізації** для запобігання багам і плутанині в порядку видачі. В англійській локалізації доступні обидва варіанти сортування за алфавітом: `Title (A-Z)` та `Title (Z-A)`.

### 🔍 8. Миттєвий пошук фільмів та серіалів (`/movies`)
- **Розширений пошуковий блок (1000px)**: Збільшена ширина пошукового поля, завдяки чому довгі українські підписи фільтрів не скорочуються трикрапкою.
- **Пошук із затримкою (Debounce 1500мс)**: Економія трафіку та відсутність зайвих запитів до API під час набору тексту.
- **Вирівнювання сітки повної ширини**: Спеціальний алгоритм не показує неповні ряди карток, доки є можливість довантажити ще.
- **Синхронізація з URL**: Пошуковий запит та активні фільтри записуються в адресний рядок (`?query=...&genres=...&type=...&age=...&sort=...`), що дозволяє ділитися посиланнями.

### 🧭 9. Збереження сесії та відновлення скролу
- **Перегляд без втрат**: Якщо користувач довантажив кілька сторінок карток (наприклад, 60 тайтлів) і проскролив донизу, після переходу на сторінку конкретного фільму та натискання «Назад» повністю відновлюється список завантажених карток, номер поточної сторінки та точна позиція скролу.
- **Очищення сесії при зміні фільтрів**: Зміна будь-якого фільтра чи пошукового запиту автоматично й плавно повертає список до першої сторінки.

### ⭐ 10. 5-зіркова система оцінювання від критиків
- **Подвійна оцінка**: Можливість порівняти глобальний бал TMDB (з 10) та власну 5-зіркову оцінку глядачів.
- **Точність у 0.5 зірки**: Зручний інтерактивний вибір оцінки з кроком у півзірки (`StarRatingInput`).
- **Кольоровий зворотний зв'язок**: Смарагдовий (висока оцінка), Бурштиновий (середня), Трояндовий (низька).
- **Розподіл оцінок**: Наочна діаграма розподілу глядацьких балів у підвкладці фільму.
- **Індивідуальне та глобальне скидання**: Скидання оцінки для конкретного тайтла або повне очищення з підтвердженням і плавними анімаціями кнопок.

### 📸 11. Медіа-центр та повноекранна фотогалерея (`/movies/:movieId`)
- **Лайтбокс фотографій (`MovieGallery`)**: Зручний перегляд бекдропів та кадрів зі зйомок із підтримкою клавіатури (`Esc` для закриття, стрілки `←` / `→` для перемикання), плавним ефектом появи (fade-in) та лічильником зображень.
- **Плавне перемикання вкладок**: Перехід між вкладками («Рейтинг», «Актори», «Відео», «Про фільм/серіал», «Відгуки», «Схожі») відбувається миттєво на місці без перезавантаження всієї сторінки.
- **Мульти-відео хаб YouTube (`/movies/:movieId/videos`)**: Вбудований відеоплеєр із інтерактивною панеллю вибору роликів за категоріями (трейлери, тизери, бекстейдж, кліпи, матеріали зі зйомок) з лічильниками кількості, евристичним розпізнаванням мови та автоматичним підтягуванням роликів мовою оригіналу, якщо локалізованих у базі TMDB немає.
- **Сервіси перегляду «Де дивитися»**: Інтеграція з TMDB Watch Providers API (за підтримки JustWatch) у вкладці «Про фільм» із відображенням ліцензійних платформ для підписки (Megogo, Netflix, Apple TV тощо), прокату чи купівлі.
- **Акторський склад**: Картки акторів із портретами та іменами їхніх персонажів.
- **Відгуки глядачів та схожі тайтли**: Читання рецензій спільноти та рекомендації подібних фільмів чи серіалів з кнопкою збереження в один клік.

### 🎬 12. Анімаційний лоадер-хлопавка
- Фірмова векторна CSS-анімація кінохлопавки у смарагдово-вишневих тонах.
- Мінімальний поріг відображення (0.5с) виключає неприємне мерехтіння інтерфейсу при швидких відповідях мережі.

### 🌊 13. Безперервна ембієнт-хвиля
- Анімований плавний градієнт 50/50, що рендериться за допомогою апаратного прискорення GPU.
- Математично прив'язаний до абсолютного часу Unix Epoch (`Date.now()`), завдяки чому хвиля не переривається й не починається спочатку при переходах між сторінками.

### 🔄 14. Реактивна міжвкладочна синхронізація без затримок
- Інтеграція DOM `CustomEvent` та слухачів `storage` браузера.
- Оцінювання фільму чи додавання до списку збережених в одній вкладці миттєво оновлює всі відкриті сторінки без зайвих запитів до сервера.

### ℹ️ 15. Повнота даних та особливості відкритої бази TMDB
- **Світова відкрита база**: Усі фільми, серіали, описи, постери, акторський склад, трейлери та бюджети підтягуються в реальному часі через відкритий API сервісу [The Movie Database (TMDB)](https://www.themoviedb.org/).
- **Варіативність наповнення**: Оскільки база формується спільнотою, інформація про окремі тайтли (зокрема наявність українського перекладу синопсису, повного акторського складу, точного бюджету, трейлерів або вікових маркувань) може бути неповною, фрагментарною або тимчасово доступною лише мовою оригіналу через об'єктивні обмеження наповненості сторонньої БД.

---

## 🛠️ Стек технологій

| Технологія | Призначення |
|---|---|
| **React 18.3** | Компонентна архітектура, хуки, контекст, клієнтський життєвий цикл |
| **TypeScript 5.9** | Строга типізація, інтерфейси даних TMDB та якість коду |
| **Vite 5.2** | Блискавичний бандлер нового покоління, dev-сервер із HMR |
| **React Router v6** | Маршрутизація, вкладені маршрути, робота з query-параметрами |
| **Vite PWA & Workbox** | Service Worker з офлайн-кешуванням та банером встановлення PWA |
| **Vanilla CSS Modules** | Модульні, ізольовані стилі без сторонніх важких CSS-бібліотек |
| **TMDB REST API v3** | Отримання метаданих фільмів, постерів, акторів, відгуків та трейлерів |
| **Custom Language Context** | Реактивна система швидкої зміни мови (`EN` / `UA`) без перезавантаження сайту |
| **SessionStorage API** | Збереження накопичених списків фільмів та координат скролу |
| **LocalStorage Event Bus** | Збереження оцінок та списку перегляду з миттєвою синхронізацією між вкладками |
| **GitHub Actions & Vercel** | Автоматизована збірка та публікація на GitHub Pages і Vercel |

---

## 📁 Структура проєкту

```text
react-movie-finder/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD пайплайн збірки на GitHub Pages
├── public/
│   ├── 404.html                    # Редірект для SPA на GitHub Pages
│   ├── apple-touch-icon.png        # Іконка для iOS PWA
│   ├── favicon.ico                 # Фавіконка браузера
│   ├── favicon.svg                 # Векторна фавіконка
│   ├── logo192.png                 # Іконка PWA 192x192
│   ├── logo512.png                 # Іконка PWA 512x512
│   ├── manifest.json               # Маніфест веб-додатка
│   ├── maskable_icon.png           # Адаптивна іконка для Android
│   └── vercel.json                 # Конфіг маршрутизації Vercel
├── src/
│   ├── components/                 # Модульні компоненти інтерфейсу (Header, FilterBar, Details тощо)
│   │   ├── AgeRatingBadge/         # Вікові бейджі (0+, 6+, 12+, 16+, 18+)
│   │   ├── Cast/                   # Картки акторів
│   │   ├── CriticsScore/           # 5-зірковий рейтинг критиків, розподіл, скидання
│   │   ├── FilterBar/              # Панель фільтрів за форматом, жанрами, віком та сортуванням
│   │   ├── GenreFilter/            # Модальне вікно вибору жанрів
│   │   ├── Header/                 # Навігаційна панель, мобільне меню, лічильник збережених
│   │   ├── LanguageToggle/         # Кнопка перемикання мови EN / UA
│   │   ├── Loader/                 # Фірмовий анімаційний кінолоадер
│   │   ├── MediaTypeBadge/         # Бейджі формату «Фільм» / «Серіал»
│   │   ├── MovieDetails/           # Сторінка деталей фільму та піднавігація
│   │   ├── MovieInfo/              # Метадані фільму та сервіси перегляду JustWatch
│   │   ├── MoviePoster/            # Постер із плавною появою та захистом від битих посилань
│   │   ├── PWAInstallPrompt/       # Банер встановлення PWA додатку
│   │   ├── Reviews/                # Відгуки глядачів
│   │   ├── SaveMovieButton/        # Кнопка додавання до закладок
│   │   ├── ScrollToTop/            # Плаваюча кнопка повернення нагору
│   │   ├── SimilarMovies/          # Рекомендації схожих тайтлів
│   │   ├── Videos/                 # YouTube медіа-хаб трейлерів та кліпів
│   │   └── App.tsx                 # Головний компонент і маршрути застосунку
│   ├── context/                    # LanguageContext (провайдер двомовності EN/UA)
│   ├── hooks/                      # useMovieRating, useSavedMovies та інші хуки
│   ├── pages/                      # Сторінки (Home, Movies, Saved, Trending, NotFound)
│   ├── translations/               # Словник локалізації translations.ts
│   ├── types/                      # TypeScript-типи (filters, tmdb, session, ratings)
│   ├── utils/                      # Допоміжні утиліти sessionStorage.ts
│   ├── fetch.ts                    # Інтеграція з TMDB API
│   ├── index.css                   # Глобальні стилі, дизайн-токени та фонова хвиля
│   ├── index.tsx                   # Точка входу в застосунок
│   ├── service-worker.ts           # Власний Service Worker для PWA
│   ├── serviceWorkerRegistration.ts# Реєстрація Service Worker
│   └── vite-env.d.ts               # Декларації типів оточення Vite
├── .editorconfig
├── .env.example                    # Зразок змінних середовища
├── .gitignore
├── .prettierrc.json
├── eslint.config.js                # Flat ESLint конфігурація
├── index.html                      # Головний HTML-шаблон для Vite
├── LICENSE                         # Ліцензія MIT
├── package.json                    # Залежності та скрипти проєкту
├── tsconfig.json                   # Налаштування компілятора TypeScript
├── vercel.json                     # Конфіг розгортання на Vercel
└── vite.config.ts                  # Конфігурація Vite, аліасів та PWA
```

---

## 🚀 Як запустити проєкт локально

### Попередні вимоги
- **Node.js** (версія 18 або 20+)
- **npm** (версія 9 або новіша)

### 1. Клонувати репозиторій
```bash
git clone https://github.com/iberikofer/movie-finder.git
cd movie-finder
```

### 2. Встановити залежності
```bash
npm install
```

### 3. Налаштувати змінні середовища
Скопіюйте файл `.env.example` у файл `.env`:
```bash
cp .env.example .env
```
Переконайтеся, що файл `.env` містить:
```bash
VITE_TMDB_TOKEN=ваш_токен_tmdb_v4_тут
```
> **Порада:** Отримати безкоштовний API Read Access Token можна в [налаштуваннях вашого акаунта TMDB](https://www.themoviedb.org/settings/api). Якщо змінну не вказано, додаток автоматично використовує вбудований демо-токен для швидкого тестування.

### 4. Запустити сервер розробки
```bash
npm run dev
# або
npm start
```
Відкрийте [http://localhost:5173/](http://localhost:5173/) у вашому браузері.

---

## 📜 Доступні команди

- `npm run dev` (або `npm start`) — Запуск додатку в режимі швидкої розробки з HMR на `http://localhost:5173/`.
- `npm run build` — Перевірка типів TypeScript та компіляція оптимізованої виробничої збірки в папку `dist/`.
- `npm run preview` — Локальний перегляд скомпільованої виробничої збірки з папки `dist/`.
- `npm run type-check` — Перевірка типів TypeScript (`tsc --noEmit`) без генерації файлів.
- `npm run lint:js` — Перевірка якості та стилю коду за допомогою ESLint.

---

## 💡 Подяки та джерела натхнення

Архітектура авторської 5-зіркової системи оцінювання критиків та аналітики задоволеності глядачів була натхненна проєктом:
👉 **[iberikofer/feedback-page](https://github.com/iberikofer/feedback-page)** — Customer satisfaction scoring and interactive feedback application.

---

## 🌐 Розгортання (Deployment)

Додаток підтримує розгортання на декількох платформах:
- **GitHub Pages**: Автоматично збирається та публікується на GitHub Pages після кожного коміту в гілку `main` через GitHub Actions (`.github/workflows/deploy.yml`).
- **Vercel**: Повністю налаштовано для розгортання з конфігурацією SPA-маршрутизації у `vercel.json`.
