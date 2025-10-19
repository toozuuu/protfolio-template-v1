import { Injectable, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'en' | 'sv' | 'si' | 'es' | 'fr' | 'de' | 'pt' | 'zh' | 'ja' | 'ko' | 'hi';
const STORAGE_KEY = 'site-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly isBrowser: boolean;
  
  // Signal for current language
  private readonly _lang = signal<Lang>('en');
  
  // Computed signals for language state
  readonly lang = this._lang.asReadonly();
  readonly isEnglish = computed(() => this._lang() === 'en');
  readonly isSinhala = computed(() => this._lang() === 'si');
  readonly isSwedish = computed(() => this._lang() === 'sv');
  
  // Available languages signal
  readonly availableLanguages = signal<Lang[]>(['en', 'sv', 'si', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ko', 'hi']);

  constructor(
    private readonly i18n: TranslateService,
    @Inject(DOCUMENT) private readonly doc: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Initialize language setup immediately
    this.initializeLanguage();
  }

  private initializeLanguage() {
    try {
      this.i18n.addLangs(this.availableLanguages());
      this.i18n.setDefaultLang('en');
      console.log('Language service initialized with languages:', this.availableLanguages());
    } catch (error) {
      console.error('Failed to initialize language service:', error);
    }

    let initial: Lang = 'en';
    if (this.isBrowser) {
      try {
        const saved = (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? null;
        if (saved && this.availableLanguages().includes(saved)) {
          initial = saved;
        } else {
          const browser = (navigator.language || navigator.languages?.[0] || '').toLowerCase();
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
      } catch (error) {
        console.warn('Language detection failed:', error);
        initial = 'en';
      }
    }
    this.use(initial);
  }

  use(lang: Lang) {
    try {
      console.log('Switching to language:', lang);
      this._lang.set(lang);
      this.i18n.use(lang);
      this.doc.documentElement.setAttribute('lang', lang);
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, lang);
      }
      console.log('Language switched successfully to:', lang);
    } catch (error) {
      console.error('Language switch failed:', error);
      // Fallback to English if language switch fails
      this._lang.set('en');
      this.i18n.use('en');
      this.doc.documentElement.setAttribute('lang', 'en');
    }
  }

  cycle() {
    const order = this.availableLanguages();
    const next = order[(order.indexOf(this._lang()) + 1) % order.length];
    this.use(next);
  }
}
