# Portfolio – Angular 17+ (SSR, Netlify)

A modern, fast, and accessible developer portfolio built with **Angular (standalone components)**, **SSR/hydration**, and deployed on **Netlify**.
Includes smooth reveal-on-scroll animations, “see more / see less” lists for long experience items, and a fun **terminal-style About** block with a typing effect.

Live demo: **[(https://protfolio-template-v1.netlify.app/](https://sachindilshan.netlify.app))**

> If you’re using this as a template, replace text, images, and social links in `home.html` and component inputs.

---

## ✨ Features

* **Angular 17+ standalone** (no NgModules), Vite dev server
* **SSR + hydration** for SEO and first-paint performance
* **Responsive layout** with clean CSS grid + fluid typography
* **Reveal-on-scroll animations** (IO + MutationObserver, SSR-safe)
* **“See more / See less”** collapsible lists (no extra component needed)
* **Terminal-style About** with typing animation (replay/skip controls)
* **Optional custom cursor** (ring + dot, hover growth, click pop)
* Smooth scrolling to anchored sections (`About`, `Work`)
* Friendly content structure for easy editing

---

## 🧱 Tech Stack

* **Angular** 17/18/19 (standalone components)
* **SSR** using Angular’s built-in builder
* **Vite dev server** (via Angular CLI)
* **SCSS** for styling
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
# or Angular CLI:
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
   * **Publish directory**: Netlify adapter handles this via the runtime. If you’re using a custom adapter or output path, match it accordingly.

> Tip: Netlify will detect Angular; the `@netlify/angular-runtime` takes care of SSR functions and routing.

---

## 🧩 Key UI Behaviors

### Reveal-on-Scroll (SSR-safe)

* Uses `IntersectionObserver` + `MutationObserver`
* Runs **after hydration** with `afterNextRender({ injector })`
* Progressive enhancement: content is visible by default; hidden only after JS adds `html.js`

If you ever encounter `IntersectionObserver is not defined`, make sure the logic runs only in the browser (`isPlatformBrowser`) and use `afterNextRender` with an **injection context**.

### “See more / See less” for Experience

No new components—just a small toggle:

```ts
expanded = new Set<string>();
isExpanded(id: string) { return this.expanded.has(id); }
toggle(id: string) { this.isExpanded(id) ? this.expanded.delete(id) : this.expanded.add(id); }
```

In the template, wrap the list in a constrained container with a gradient fade and toggle `max-height`.

### Terminal-Style About (CLI typing)

* A `<pre>` block with a `#cli` span is typed character-by-character
* Replay and Skip controls
* Pure text to avoid hydration mismatches

---

## ⚙️ Configuration & Content

* **Profile content**: edit `home.html` (intro, skills, education, experience).
* **Projects**: update the `projects` array in `home.ts` (title, description, tags, links).
* **Images**: place assets in `/assets` and update paths in templates.

---

## ✅ Accessibility & Performance

* Respect **reduced motion** (`prefers-reduced-motion`)
* Keyboard accessible toggles (`aria-expanded`)
* Hydration-safe animations (content is visible if JS fails)
* Preconnect to fonts/CDNs if you add them
* Use compressed images (WebP/AVIF) where possible

---

## 🧰 Troubleshooting

### `IntersectionObserver is not defined`

You’re running the code in SSR. Guard with:

```ts
import { isPlatformBrowser } from '@angular/common';
if (!isPlatformBrowser(this.platformId)) return;
```

and initialize **after hydration**:

```ts
afterNextRender(() => { ... }, { injector: this.injector });
```

### `NG0203: afterNextRender() can only be used within an injection context`

Pass an injector:

```ts
private readonly injector = inject(EnvironmentInjector);
afterNextRender(() => { ... }, { injector: this.injector });
```

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

* Theme toggle (light/dark)
* Project filters and search
* MD/JSON content sources
* i18n language toggle
* Unit tests for UI behaviors

---

## 📄 License

MIT — Feel free to use and adapt. Attribution appreciated!

---

## 🙌 Credits

* Built with Angular standalone + SSR
* Deployed on Netlify
* Terminal UI/typing & reveal behaviors adapted for SSR-safe hydration
