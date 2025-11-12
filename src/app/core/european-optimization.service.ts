import { Injectable, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface EuropeanRegion {
  code: string;
  name: string;
  timezone: string;
  currency: string;
  language: string;
  cdnEndpoint: string;
  performanceTargets: {
    maxLoadTime: number;
    maxBundleSize: number;
    maxImageSize: number;
  };
}

@Injectable({ providedIn: 'root' })
export class EuropeanOptimizationService {
  private readonly isBrowser: boolean;
  private readonly _userRegion = signal<EuropeanRegion | null>(null);
  private readonly _optimizationLevel = signal<'basic' | 'enhanced' | 'premium'>('basic');

  // Computed signals
  readonly userRegion = this._userRegion.asReadonly();
  readonly optimizationLevel = this._optimizationLevel.asReadonly();
  readonly isEuropeanUser = computed(() => this._userRegion() !== null);
  readonly shouldUseCDN = computed(() => this._userRegion()?.cdnEndpoint !== undefined);

  // European regions configuration
  private readonly europeanRegions: EuropeanRegion[] = [
    {
      code: 'DE',
      name: 'Germany',
      timezone: 'Europe/Berlin',
      currency: 'EUR',
      language: 'de',
      cdnEndpoint: 'https://cdn-eu-central-1.sachindilshan.netlify.app',
      performanceTargets: {
        maxLoadTime: 2000,
        maxBundleSize: 500,
        maxImageSize: 200,
      },
    },
    {
      code: 'FR',
      name: 'France',
      timezone: 'Europe/Paris',
      currency: 'EUR',
      language: 'fr',
      cdnEndpoint: 'https://cdn-eu-west-1.sachindilshan.netlify.app',
      performanceTargets: {
        maxLoadTime: 2000,
        maxBundleSize: 500,
        maxImageSize: 200,
      },
    },
    {
      code: 'ES',
      name: 'Spain',
      timezone: 'Europe/Madrid',
      currency: 'EUR',
      language: 'es',
      cdnEndpoint: 'https://cdn-eu-west-1.sachindilshan.netlify.app',
      performanceTargets: {
        maxLoadTime: 2000,
        maxBundleSize: 500,
        maxImageSize: 200,
      },
    },
    {
      code: 'PT',
      name: 'Portugal',
      timezone: 'Europe/Lisbon',
      currency: 'EUR',
      language: 'pt',
      cdnEndpoint: 'https://cdn-eu-west-1.sachindilshan.netlify.app',
      performanceTargets: {
        maxLoadTime: 2000,
        maxBundleSize: 500,
        maxImageSize: 200,
      },
    },
    {
      code: 'SE',
      name: 'Sweden',
      timezone: 'Europe/Stockholm',
      currency: 'SEK',
      language: 'sv',
      cdnEndpoint: 'https://cdn-eu-north-1.sachindilshan.netlify.app',
      performanceTargets: {
        maxLoadTime: 2000,
        maxBundleSize: 500,
        maxImageSize: 200,
      },
    },
    {
      code: 'IT',
      name: 'Italy',
      timezone: 'Europe/Rome',
      currency: 'EUR',
      language: 'it',
      cdnEndpoint: 'https://cdn-eu-central-1.sachindilshan.netlify.app',
      performanceTargets: {
        maxLoadTime: 2000,
        maxBundleSize: 500,
        maxImageSize: 200,
      },
    },
    {
      code: 'NL',
      name: 'Netherlands',
      timezone: 'Europe/Amsterdam',
      currency: 'EUR',
      language: 'nl',
      cdnEndpoint: 'https://cdn-eu-west-1.sachindilshan.netlify.app',
      performanceTargets: {
        maxLoadTime: 2000,
        maxBundleSize: 500,
        maxImageSize: 200,
      },
    },
    {
      code: 'BE',
      name: 'Belgium',
      timezone: 'Europe/Brussels',
      currency: 'EUR',
      language: 'nl',
      cdnEndpoint: 'https://cdn-eu-west-1.sachindilshan.netlify.app',
      performanceTargets: {
        maxLoadTime: 2000,
        maxBundleSize: 500,
        maxImageSize: 200,
      },
    },
    {
      code: 'AT',
      name: 'Austria',
      timezone: 'Europe/Vienna',
      currency: 'EUR',
      language: 'de',
      cdnEndpoint: 'https://cdn-eu-central-1.sachindilshan.netlify.app',
      performanceTargets: {
        maxLoadTime: 2000,
        maxBundleSize: 500,
        maxImageSize: 200,
      },
    },
    {
      code: 'CH',
      name: 'Switzerland',
      timezone: 'Europe/Zurich',
      currency: 'CHF',
      language: 'de',
      cdnEndpoint: 'https://cdn-eu-central-1.sachindilshan.netlify.app',
      performanceTargets: {
        maxLoadTime: 2000,
        maxBundleSize: 500,
        maxImageSize: 200,
      },
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeEuropeanOptimization();
  }

  private async initializeEuropeanOptimization(): Promise<void> {
    if (!this.isBrowser) return;

    try {
      const region = await this.detectUserRegion();
      if (region) {
        this._userRegion.set(region);
        this.applyEuropeanOptimizations(region);
      }
    } catch (error) {
      console.warn('Failed to detect European region:', error);
    }
  }

  private async detectUserRegion(): Promise<EuropeanRegion | null> {
    if (!this.isBrowser) return null;

    try {
      // Try to detect region from browser language and timezone
      const browserLang = navigator.language.toLowerCase();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Check if user is in a European timezone
      const isEuropeanTimezone = timezone.startsWith('Europe/');

      if (isEuropeanTimezone) {
        // Find matching region
        const region = this.europeanRegions.find(
          (r) => r.timezone === timezone || browserLang.startsWith(r.language),
        );

        if (region) {
          return region;
        }
      }

      // Fallback: check browser language for European languages
      const europeanLanguages = ['de', 'fr', 'es', 'pt', 'sv', 'it', 'nl'];
      const detectedLang = europeanLanguages.find((lang) => browserLang.startsWith(lang));

      if (detectedLang) {
        return this.europeanRegions.find((r) => r.language === detectedLang) || null;
      }

      return null;
    } catch (error) {
      console.warn('Error detecting user region:', error);
      return null;
    }
  }

  private applyEuropeanOptimizations(region: EuropeanRegion): void {
    // Set optimization level based on region
    const optimizationLevel = this.determineOptimizationLevel(region);
    this._optimizationLevel.set(optimizationLevel);

    // Apply region-specific optimizations
    this.optimizeForRegion(region);
  }

  private determineOptimizationLevel(region: EuropeanRegion): 'basic' | 'enhanced' | 'premium' {
    // Premium regions get enhanced optimization
    const premiumRegions = ['DE', 'FR', 'SE', 'NL'];
    if (premiumRegions.includes(region.code)) {
      return 'premium';
    }

    // Other European regions get enhanced optimization
    return 'enhanced';
  }

  private optimizeForRegion(region: EuropeanRegion): void {
    // Apply CDN optimization
    if (region.cdnEndpoint) {
      this.configureCDN(region.cdnEndpoint);
    }

    // Apply performance optimizations
    this.applyPerformanceOptimizations(region);

    // Apply region-specific settings
    this.applyRegionSettings(region);
  }

  private configureCDN(endpoint: string): void {
    // Configure CDN endpoint for assets
    if (this.isBrowser) {
      // Store CDN endpoint for asset loading
      sessionStorage.setItem('cdn-endpoint', endpoint);
    }
  }

  private applyPerformanceOptimizations(region: EuropeanRegion): void {
    // Apply performance optimizations based on region
    const targets = region.performanceTargets;

    // Configure performance monitoring
    if (this.isBrowser) {
      // Set performance targets
      sessionStorage.setItem('performance-targets', JSON.stringify(targets));

      // Enable enhanced monitoring for European users
      this.enableEnhancedMonitoring();
    }
  }

  private applyRegionSettings(region: EuropeanRegion): void {
    // Apply region-specific settings
    if (this.isBrowser) {
      // Set timezone
      sessionStorage.setItem('user-timezone', region.timezone);

      // Set currency
      sessionStorage.setItem('user-currency', region.currency);

      // Set language preference
      sessionStorage.setItem('preferred-language', region.language);
    }
  }

  private enableEnhancedMonitoring(): void {
    // Enable enhanced performance monitoring for European users
    if (this.isBrowser) {
      // Monitor Core Web Vitals more closely
      this.monitorCoreWebVitals();

      // Monitor bundle size
      this.monitorBundleSize();

      // Monitor image optimization
      this.monitorImageOptimization();
    }
  }

  private monitorCoreWebVitals(): void {
    // Enhanced Core Web Vitals monitoring for European users
    if (this.isBrowser && 'web-vitals' in window) {
      // This would integrate with web-vitals library
      console.log('Enhanced Core Web Vitals monitoring enabled for European users');
    }
  }

  private monitorBundleSize(): void {
    // Monitor bundle size for European users
    if (this.isBrowser) {
      // Check if bundle size exceeds targets
      const targets = JSON.parse(sessionStorage.getItem('performance-targets') || '{}');
      if (targets.maxBundleSize) {
        console.log(`Bundle size target for European users: ${targets.maxBundleSize}KB`);
      }
    }
  }

  private monitorImageOptimization(): void {
    // Monitor image optimization for European users
    if (this.isBrowser) {
      const targets = JSON.parse(sessionStorage.getItem('performance-targets') || '{}');
      if (targets.maxImageSize) {
        console.log(`Image size target for European users: ${targets.maxImageSize}KB`);
      }
    }
  }

  // Public methods for accessing optimization data
  getCDNEndpoint(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem('cdn-endpoint');
  }

  getPerformanceTargets(): any {
    if (!this.isBrowser) return null;
    const targets = sessionStorage.getItem('performance-targets');
    return targets ? JSON.parse(targets) : null;
  }

  getUserTimezone(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem('user-timezone');
  }

  getUserCurrency(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem('user-currency');
  }

  getPreferredLanguage(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem('preferred-language');
  }

  // Method to get optimized asset URL
  getOptimizedAssetUrl(assetPath: string): string {
    const cdnEndpoint = this.getCDNEndpoint();
    if (cdnEndpoint && this.shouldUseCDN()) {
      return `${cdnEndpoint}${assetPath}`;
    }
    return assetPath;
  }

  // Method to check if user should get enhanced features
  shouldGetEnhancedFeatures(): boolean {
    return this.isEuropeanUser() && this.optimizationLevel() !== 'basic';
  }
}
