import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'site-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme: Theme = 'light';
  private readonly isBrowser: boolean;

  constructor(
    @Inject(DOCUMENT) private readonly doc: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved) {
        this.set(saved);
        return;
      }

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.set(prefersDark ? 'dark' : 'light');

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => {
          if (!localStorage.getItem(STORAGE_KEY)) {
            this.set(e.matches ? 'dark' : 'light');
          }
        });
    } else {
      this.set('light');
    }
  }

  set(next: Theme) {
    this.theme = next;
    this.doc.documentElement.setAttribute('data-theme', next);
  }

  toggle() {
    const next: Theme = this.theme === 'dark' ? 'light' : 'dark';
    this.set(next);
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, next);
    }
  }

  useSystem() {
    if (this.isBrowser) {
      localStorage.removeItem(STORAGE_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.set(prefersDark ? 'dark' : 'light');
    }
  }
}
