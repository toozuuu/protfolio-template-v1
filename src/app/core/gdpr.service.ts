import { Injectable, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface GDPRConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
  version: string;
}

@Injectable({ providedIn: 'root' })
export class GDPRService {
  private readonly isBrowser: boolean;
  private readonly STORAGE_KEY = 'gdpr-consent';
  private readonly CONSENT_VERSION = '1.0';
  
  // GDPR consent signal
  private readonly _consent = signal<GDPRConsent | null>(null);
  private readonly _showBanner = signal<boolean>(false);
  
  // Computed signals
  readonly consent = this._consent.asReadonly();
  readonly showBanner = this._showBanner.asReadonly();
  readonly hasConsent = computed(() => this._consent() !== null);
  readonly canTrackAnalytics = computed(() => this._consent()?.analytics === true);
  readonly canTrackMarketing = computed(() => this._consent()?.marketing === true);
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeGDPR();
  }

  private initializeGDPR(): void {
    if (!this.isBrowser) return;
    
    const savedConsent = this.getStoredConsent();
    if (savedConsent && this.isConsentValid(savedConsent)) {
      this._consent.set(savedConsent);
    } else {
      this._showBanner.set(true);
    }
  }

  private getStoredConsent(): GDPRConsent | null {
    if (!this.isBrowser) return null;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private isConsentValid(consent: GDPRConsent): boolean {
    // Consent is valid for 1 year
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    return (now - consent.timestamp) < oneYear && consent.version === this.CONSENT_VERSION;
  }

  giveConsent(consent: Partial<GDPRConsent>): void {
    if (!this.isBrowser) return;
    
    const fullConsent: GDPRConsent = {
      necessary: true, // Always true
      analytics: consent.analytics ?? false,
      marketing: consent.marketing ?? false,
      preferences: consent.preferences ?? false,
      timestamp: Date.now(),
      version: this.CONSENT_VERSION
    };
    
    this._consent.set(fullConsent);
    this._showBanner.set(false);
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(fullConsent));
    } catch (error) {
      console.warn('Failed to store GDPR consent:', error);
    }
  }

  revokeConsent(): void {
    if (!this.isBrowser) return;
    
    this._consent.set(null);
    this._showBanner.set(true);
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to remove GDPR consent:', error);
    }
  }

  updateConsent(updates: Partial<GDPRConsent>): void {
    if (!this.isBrowser || !this._consent()) return;
    
    const currentConsent = this._consent()!;
    const updatedConsent: GDPRConsent = {
      ...currentConsent,
      ...updates,
      timestamp: Date.now()
    };
    
    this.giveConsent(updatedConsent);
  }

  // Data processing information
  getDataProcessingInfo() {
    return {
      controller: 'Sachin Dilshan',
      contact: 'sachindilshan040@gmail.com',
      purposes: {
        necessary: 'Essential for website functionality',
        analytics: 'Website usage analytics and performance monitoring',
        marketing: 'Marketing communications and personalized content',
        preferences: 'User preference storage and personalization'
      },
      legalBasis: {
        necessary: 'Legitimate interest',
        analytics: 'Consent',
        marketing: 'Consent',
        preferences: 'Consent'
      },
      retentionPeriod: '1 year or until consent is withdrawn',
      rights: [
        'Right to access your data',
        'Right to rectification',
        'Right to erasure',
        'Right to restrict processing',
        'Right to data portability',
        'Right to object',
        'Right to withdraw consent'
      ]
    };
  }

  // Contact information for data protection
  getDataProtectionContact() {
    return {
      email: 'sachindilshan040@gmail.com',
      subject: 'Data Protection Inquiry',
      responseTime: '30 days'
    };
  }
}
