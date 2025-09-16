import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'en' | 'sv' | 'si'; // add 'si'
const STORAGE_KEY = 'site-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly isBrowser: boolean;
  private _lang: Lang = 'en';
  get lang(): Lang { return this._lang; }

  constructor(
    private readonly i18n: TranslateService,
    @Inject(DOCUMENT) private readonly doc: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.i18n.addLangs(['en', 'sv', 'si']);
    this.i18n.setDefaultLang('en');

    let initial: Lang = 'en';
    if (this.isBrowser) {
      const saved = (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? null;
      if (saved && ['en', 'sv', 'si'].includes(saved)) {
        initial = saved;
      } else {
        const browser = (navigator.language || '').toLowerCase();
        if (browser.startsWith('sv')) initial = 'sv';
        else if (browser.startsWith('si') || browser.startsWith('sr-lk')) initial = 'si';
      }
    }
    this.use(initial);
  }

  use(lang: Lang) {
    this._lang = lang;
    this.i18n.use(lang);
    this.doc.documentElement.setAttribute('lang', lang);
    if (this.isBrowser) localStorage.setItem(STORAGE_KEY, lang);
  }

  cycle() {
    const order: Lang[] = ['en', 'sv', 'si'];
    const next = order[(order.indexOf(this._lang) + 1) % order.length];
    this.use(next);
  }
}
