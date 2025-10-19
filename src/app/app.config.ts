import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideBrowserGlobalErrorListeners, provideZonelessChangeDetection,ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';

import { provideHttpClient, withFetch, withInterceptors, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PerformanceService } from './core/performance.service';
import { ThemeService } from './core/theme.service';
import { LanguageService } from './core/language.service';
import { SEOService } from './core/seo.service';
import { AnalyticsService } from './core/analytics.service';
import { AnimationsService } from './core/animations.service';
import { LazyLoadingService } from './core/lazy-loading.service';
import { ImageOptimizationService } from './core/image-optimization.service';
import { CSSOptimizationService } from './core/css-optimization.service';
import { GDPRService } from './core/gdpr.service';
import { EuropeanOptimizationService } from './core/european-optimization.service';
import { EuropeanSEOService } from './core/european-seo.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(withEventReplay()),

    provideHttpClient(withFetch()),

    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      })
    ),

    PerformanceService,
    ThemeService,
    LanguageService,
    SEOService,
    AnalyticsService,
    AnimationsService,
    LazyLoadingService,
    ImageOptimizationService,
    CSSOptimizationService,
    GDPRService,
    EuropeanOptimizationService,
    EuropeanSEOService,
    { provide: LOCALE_ID, useValue: 'en' },
  ],
};
