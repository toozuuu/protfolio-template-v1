# Portfolio – Angular 17+ (SSR, Netlify)

A modern, fast, and accessible developer portfolio built with **Angular (standalone components)**, **SSR/hydration**, and deployed on **Netlify**.
Includes reveal-on-scroll animations, “see more / see less” lists for long experience items, a **terminal-style About** typing effect, and a **light/dark theme** with persisted preference (SSR‑safe).

**Live demo:** [https://sachindilshan.netlify.app](https://sachindilshan.netlify.app)

> If you’re using this as a template, replace text, images, and social links in `home.html` and component inputs.

---

## ✨ Features

* **Angular 17+ standalone** (no NgModules), Vite dev server
* **SSR + hydration** for SEO and first-paint performance
* **Responsive layout** with clean CSS grid + fluid typography
* **Reveal-on-scroll animations** (IO + MutationObserver, SSR-safe)
* **“See more / See less”** collapsible lists (no extra component needed)
* **Terminal-style About** with typing animation (replay/skip controls)
* **Theme toggle** (light/dark) with **SSR-safe persistence**
* **System preference** support (`prefers-color-scheme`)
* Smooth scrolling to anchored sections (`About`, `Work`)
* Friendly content structure for easy editing

---

## 🧱 Tech Stack

* **Angular** 17/18/19 (standalone components)
* **SSR** using Angular’s built-in builder
* **Vite dev server** (via Angular CLI)
* **SCSS** for styling (theme tokens + responsive mixins)
* **Netlify** for hosting + serverless SSR
* Optional: **@netlify/angular-runtime** for SSR on Netlify

---

## 📁 Project Structure (high level)

```
src/
  app/
    home/
      home.ts          # page logic (SSR-safe IO, typing, see-more)
      home.html        # page template (intro, about, experience, etc.)
      home.scss        # page styles (responsive, reveal, terminal, etc.)
    components/
      shared/header/
      shared/footer/
    social-buttons/
    project-card/
assets/
  My_Photo.jpg
  ...
```

---

## 🚀 Getting Started

### 1) Prerequisites

* **Node.js** 18+ (LTS recommended)
* **npm** 9+ / **pnpm** 8+ / **yarn** (choose one)
* **Angular CLI** (optional for generators):

```bash
npm i -g @angular/cli
```

### 2) Install

```bash
# with npm
npm install

# or pnpm
pnpm install
```

### 3) Run (Dev)

```bash
# CSR dev server
npm run start
# or Angular CLI
ng serve

# SSR dev (if configured)
ng serve --ssr
```

> If your `package.json` already has `dev`/`serve:ssr` scripts, use those:
>
> ```bash
> npm run dev
> npm run serve:ssr
> ```

### 4) Build

```bash
# CSR build
ng build

# SSR build (recommended for production)
ng build --ssr
```

The SSR build produces both client & server bundles.

---

## ☁️ Deploying to Netlify (SSR)

1. **Install Netlify Angular runtime** (required for Angular SSR on Netlify):

   ```bash
   npm i -D @netlify/angular-runtime@^2.2.0
   ```

   If you see this error during deploy:

   ```
   Error: Angular@19 SSR on Netlify requires '@netlify/angular-runtime' version 2.2.0 or later
   ```

   update the package as above.

2. **Add a redirect** so deep links work:

  * Create `public/_redirects` (or configure in `netlify.toml`):

    ```
    /*  /index.html  200
    ```

3. **Connect repo to Netlify** and set:

  * **Build command**: `ng build --ssr`
  * **Publish directory**: handled by the Netlify runtime. If you use a custom adapter or output path, match it accordingly.

> Tip: Netlify will detect Angular; the `@netlify/angular-runtime` takes care of SSR functions and routing.

---

## 🎨 Theming (Light/Dark)

This project uses **CSS variables** on `<html data-theme>`. A tiny `ThemeService` toggles and persists the preference, and is **SSR-safe**.

### Theme tokens (`styles.scss`)

```scss
:root {
  --bg: #ffffff;
  --bg-soft: #f6f7f9;
  --text: #0f172a;
  --text-muted: #475569;
  --primary: #5b8cff;
  --accent: #22c55e;
  --border: #e5e7eb;
  --card: #ffffff;
  --shadow: 0 10px 30px rgba(2, 6, 23, 0.06);
  --radius: 12px;
  --dur: 0.25s;
}
:root[data-theme="dark"] {
  --bg: #0b1220;
  --bg-soft: #0f172a;
  --text: #e5e7eb;
  --text-muted: #94a3b8;
  --primary: #8ab4ff;
  --accent: #34d399;
  --border: #1f2937;
  --card: #0f172a;
  --shadow: 0 10px 30px rgba(0,0,0,0.35);
}
html, body { background: var(--bg); color: var(--text); }
```

### SSR-safe `ThemeService`

```ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'site-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme: Theme = 'light';
  private isBrowser: boolean;

  constructor(@Inject(DOCUMENT) private doc: Document, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved) { this.set(saved); return; }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.set(prefersDark ? 'dark' : 'light');
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(STORAGE_KEY)) this.set(e.matches ? 'dark' : 'light');
      });
    } else {
      this.set('light'); // default on SSR
    }
  }

  set(next: Theme) {
    this.theme = next;
    this.doc.documentElement.setAttribute('data-theme', next);
  }
  toggle() {
    const next: Theme = this.theme === 'dark' ? 'light' : 'dark';
    this.set(next);
    if (this.isBrowser) localStorage.setItem(STORAGE_KEY, next);
  }
  useSystem() {
    if (this.isBrowser) {
      localStorage.removeItem(STORAGE_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.set(prefersDark ? 'dark' : 'light');
    }
  }
}
```

### Toggling in the header

```html
<button type="button" class="theme-toggle" (click)="theme.toggle()">
  <img [src]="theme.theme === 'dark' ? 'assets/moon.png' : 'assets/light.png'" width="24" height="24" />
</button>
```

```ts
// header.ts
constructor(public theme: ThemeService) {}
```

### Theme-based images (no TS)

```html
<img src="assets/logo-light.svg" class="img-light" alt="Logo" />
<img src="assets/logo-dark.svg"  class="img-dark"  alt="Logo" />
```

```scss
.img-dark { display: none; }
:root[data-theme='dark'] .img-light { display: none; }
:root[data-theme='dark'] .img-dark  { display: inline; }
```

---

## 🧩 Key UI Behaviors

### Reveal-on-Scroll (SSR-safe)

* Uses `IntersectionObserver` + `MutationObserver`
* Runs **after hydration** with `afterNextRender({ injector })`
* Progressive enhancement: content is visible by default; hidden only after JS adds `html.js`

If you see `IntersectionObserver is not defined`, ensure the code runs only in the browser (`isPlatformBrowser`) and initialize **after hydration**.

### “See more / See less” for Experience

```ts
expanded = new Set<string>();
isExpanded(id: string) { return this.expanded.has(id); }
toggle(id: string) { this.isExpanded(id) ? this.expanded.delete(id) : this.expanded.add(id); }
```

Wrap the list in a constrained container with a gradient fade and toggle `max-height`.

### Terminal-Style About (CLI typing)

* A `<pre>` block with a `#cli` span is typed character-by-character
* Replay and Skip controls
* Pure text to avoid hydration mismatches

---

## ⚙️ Configuration & Content

* **Profile content**: edit `home.html` (intro, skills, education, experience).
* **Projects**: update the `projects` array in `home.ts` (title, description, tags, links).
* **Images**: place assets in `/assets` and update paths in templates.
* **Favicon / PWA**: update icons in `/assets` as needed.

---

## ✅ Accessibility & Performance

* Respect **reduced motion** (`prefers-reduced-motion`)
* Keyboard accessible toggles (`aria-expanded` / `aria-pressed`)
* Hydration-safe animations (content is visible if JS fails)
* Preconnect to fonts/CDNs if you add them
* Use compressed images (WebP/AVIF) where possible
* Avoid layout shift: add explicit `width/height` to images

---

## 🧰 Troubleshooting

### `localStorage is not defined`

You’re in SSR. Guard `localStorage` and `matchMedia` with `isPlatformBrowser` (see `ThemeService` above).

### `IntersectionObserver is not defined`

Guard with:

```ts
import { isPlatformBrowser } from '@angular/common';
if (!isPlatformBrowser(this.platformId)) return;
```

Initialize **after hydration**:

```ts
import { afterNextRender, EnvironmentInjector, inject } from '@angular/core';
private readonly injector = inject(EnvironmentInjector);
afterNextRender(() => { /* ... */ }, { injector: this.injector });
```

### `NG0203: afterNextRender() can only be used within an injection context`

Pass an injector as shown above.

### Sections don’t reveal / remain hidden

* Ensure `document.documentElement.classList.add('js')` runs in the browser.
* CSS should scope hiding to `.js .reveal`.
* MutationObserver should observe late-rendered `.reveal` elements.

### Netlify SSR error for Angular 19

Install/update:

```bash
npm i -D @netlify/angular-runtime@^2.2.0
```

### Hard refresh 404 on sub-routes

Add Netlify redirect:

```
/*  /index.html  200
```

---

## 🗺️ Roadmap (ideas)

* Project filters and search
* MD/JSON content sources
* i18n language toggle
* Unit tests for UI behaviors
* Analytics opt-in toggle

---

## 📄 License

MIT — Feel free to use and adapt. Attribution appreciated!

---

## 🙌 Credits

* Built with Angular standalone + SSR
* Deployed on Netlify
* Terminal UI/typing & reveal behaviors adapted for SSR-safe hydration
