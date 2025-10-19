import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GDPRService } from '../../core/gdpr.service';

@Component({
  selector: 'app-gdpr-banner',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <div 
      *ngIf="showBanner()" 
      class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6"
      role="banner"
      aria-label="GDPR Consent Banner"
    >
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
          <!-- Content -->
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ 'gdpr.title' | translate }}
            </h3>
            <p class="text-sm text-gray-600 mb-4">
              {{ 'gdpr.description' | translate }}
            </p>
            
            <!-- Cookie categories -->
            <div class="space-y-2 mb-4">
              <label class="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  [checked]="true" 
                  disabled
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-gray-700">{{ 'gdpr.necessary' | translate }}</span>
                <span class="text-xs text-gray-500">({{ 'gdpr.required' | translate }})</span>
              </label>
              
              <label class="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  [(ngModel)]="analyticsConsent"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-gray-700">{{ 'gdpr.analytics' | translate }}</span>
              </label>
              
              <label class="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  [(ngModel)]="marketingConsent"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-gray-700">{{ 'gdpr.marketing' | translate }}</span>
              </label>
              
              <label class="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  [(ngModel)]="preferencesConsent"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="text-gray-700">{{ 'gdpr.preferences' | translate }}</span>
              </label>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-2 md:ml-4">
            <button
              (click)="acceptAll()"
              class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {{ 'gdpr.acceptAll' | translate }}
            </button>
            
            <button
              (click)="acceptSelected()"
              class="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              {{ 'gdpr.acceptSelected' | translate }}
            </button>
            
            <button
              (click)="rejectAll()"
              class="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              {{ 'gdpr.rejectAll' | translate }}
            </button>
          </div>
        </div>
        
        <!-- Links -->
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex flex-wrap gap-4 text-xs text-gray-500">
            <a 
              href="#" 
              (click)="showPrivacyPolicy($event)"
              class="hover:text-gray-700 underline"
            >
              {{ 'gdpr.privacyPolicy' | translate }}
            </a>
            <a 
              href="#" 
              (click)="showCookiePolicy($event)"
              class="hover:text-gray-700 underline"
            >
              {{ 'gdpr.cookiePolicy' | translate }}
            </a>
            <a 
              href="mailto:sachindilshan040@gmail.com?subject=Data Protection Inquiry"
              class="hover:text-gray-700 underline"
            >
              {{ 'gdpr.contact' | translate }}
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class GDPRBannerComponent implements OnInit {
  analyticsConsent = false;
  marketingConsent = false;
  preferencesConsent = false;
  
  showBanner = computed(() => this.gdprService.showBanner());

  constructor(private gdprService: GDPRService) {}

  ngOnInit(): void {
    // Initialize with current consent if available
    const currentConsent = this.gdprService.consent();
    if (currentConsent) {
      this.analyticsConsent = currentConsent.analytics;
      this.marketingConsent = currentConsent.marketing;
      this.preferencesConsent = currentConsent.preferences;
    }
  }

  acceptAll(): void {
    this.gdprService.giveConsent({
      analytics: true,
      marketing: true,
      preferences: true
    });
  }

  acceptSelected(): void {
    this.gdprService.giveConsent({
      analytics: this.analyticsConsent,
      marketing: this.marketingConsent,
      preferences: this.preferencesConsent
    });
  }

  rejectAll(): void {
    this.gdprService.giveConsent({
      analytics: false,
      marketing: false,
      preferences: false
    });
  }

  showPrivacyPolicy(event: Event): void {
    event.preventDefault();
    // Implement privacy policy modal or navigation
    console.log('Show privacy policy');
  }

  showCookiePolicy(event: Event): void {
    event.preventDefault();
    // Implement cookie policy modal or navigation
    console.log('Show cookie policy');
  }
}
