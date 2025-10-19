import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GDPRService } from './gdpr.service';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private gdprService: GDPRService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Track page views
  trackPageView(page: string): void {
    if (!this.isBrowser || !this.gdprService.canTrackAnalytics()) return;
    
    // Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('config', 'G-0YJC8G0R2H', {
        page_title: page,
        page_location: window.location.href
      });
    }

    console.log(`📊 Page View: ${page}`);
  }

  // Track user interactions
  trackEvent(eventName: string, parameters?: any): void {
    if (!this.isBrowser || !this.gdprService.canTrackAnalytics()) return;

    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', eventName, parameters);
    }

    console.log(`📊 Event: ${eventName}`, parameters);
  }

  // Track scroll depth
  trackScrollDepth(depth: number): void {
    if (!this.isBrowser || !this.gdprService.canTrackAnalytics()) return;

    this.trackEvent('scroll_depth', {
      value: depth,
      event_category: 'engagement'
    });
  }

  // Track time on page
  trackTimeOnPage(timeSpent: number): void {
    if (!this.isBrowser || !this.gdprService.canTrackAnalytics()) return;

    this.trackEvent('time_on_page', {
      value: timeSpent,
      event_category: 'engagement'
    });
  }

  // Track skill interactions
  trackSkillClick(skill: string): void {
    if (!this.isBrowser || !this.gdprService.canTrackAnalytics()) return;

    this.trackEvent('skill_click', {
      skill_name: skill,
      event_category: 'interaction'
    });
  }

  // Track language changes
  trackLanguageChange(language: string): void {
    if (!this.isBrowser || !this.gdprService.canTrackAnalytics()) return;

    this.trackEvent('language_change', {
      language: language,
      event_category: 'preference'
    });
  }

  // Track theme changes
  trackThemeChange(theme: string): void {
    if (!this.isBrowser || !this.gdprService.canTrackAnalytics()) return;

    this.trackEvent('theme_change', {
      theme: theme,
      event_category: 'preference'
    });
  }

  // Track contact form interactions
  trackContactForm(action: string): void {
    if (!this.isBrowser || !this.gdprService.canTrackAnalytics()) return;

    this.trackEvent('contact_form', {
      action: action,
      event_category: 'conversion'
    });
  }

  // Track project views
  trackProjectView(projectName: string): void {
    if (!this.isBrowser || !this.gdprService.canTrackAnalytics()) return;

    this.trackEvent('project_view', {
      project_name: projectName,
      event_category: 'engagement'
    });
  }

  // Track resume downloads
  trackResumeDownload(): void {
    if (!this.isBrowser || !this.gdprService.canTrackAnalytics()) return;

    this.trackEvent('resume_download', {
      event_category: 'conversion'
    });
  }
}
