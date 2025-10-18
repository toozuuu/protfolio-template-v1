import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'en' | 'sv' | 'si' | 'es' | 'fr' | 'de' | 'pt' | 'zh' | 'ja' | 'ko' | 'hi';
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
    
    // Initialize language setup after a microtask to avoid circular dependency
    setTimeout(() => {
      this.initializeLanguage();
    }, 0);
  }

  private initializeLanguage() {
    this.i18n.addLangs(['en', 'sv', 'si', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ko', 'hi']);
    this.i18n.setDefaultLang('en');

    let initial: Lang = 'en';
    if (this.isBrowser) {
      const saved = (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? null;
      if (saved && ['en', 'sv', 'si', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ko', 'hi'].includes(saved)) {
        initial = saved;
      } else {
        const browser = (navigator.language || '').toLowerCase();
        if (browser.startsWith('sv')) initial = 'sv';
        else if (browser.startsWith('si') || browser.startsWith('sr-lk')) initial = 'si';
        else if (browser.startsWith('es')) initial = 'es';
        else if (browser.startsWith('fr')) initial = 'fr';
        else if (browser.startsWith('de')) initial = 'de';
        else if (browser.startsWith('pt')) initial = 'pt';
        else if (browser.startsWith('zh')) initial = 'zh';
        else if (browser.startsWith('ja')) initial = 'ja';
        else if (browser.startsWith('ko')) initial = 'ko';
        else if (browser.startsWith('hi')) initial = 'hi';
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
    const order: Lang[] = ['en', 'sv', 'si', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ko', 'hi'];
    const next = order[(order.indexOf(this._lang) + 1) % order.length];
    this.use(next);
  }
}
