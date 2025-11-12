import { Injectable, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  tti: number; // Time to Interactive
}

@Injectable({ providedIn: 'root' })
export class PerformanceMonitorService {
  private readonly isBrowser: boolean;

  // Signals for performance metrics
  private readonly _metrics = signal<PerformanceMetrics>({
    lcp: 0,
    fid: 0,
    cls: 0,
    fcp: 0,
    tti: 0,
  });

  private readonly _isMonitoring = signal(false);
  private readonly _lastUpdate = signal<Date | null>(null);

  // Computed signals for performance state
  readonly metrics = this._metrics.asReadonly();
  readonly isMonitoring = this._isMonitoring.asReadonly();
  readonly lastUpdate = this._lastUpdate.asReadonly();

  // Computed signals for performance analysis
  readonly performanceScore = computed(() => {
    const m = this._metrics();
    let score = 100;

    // LCP scoring (0-100)
    if (m.lcp > 4000) score -= 30;
    else if (m.lcp > 2500) score -= 20;
    else if (m.lcp > 1500) score -= 10;

    // FID scoring (0-100)
    if (m.fid > 300) score -= 25;
    else if (m.fid > 100) score -= 15;
    else if (m.fid > 50) score -= 5;

    // CLS scoring (0-100)
    if (m.cls > 0.25) score -= 25;
    else if (m.cls > 0.1) score -= 15;
    else if (m.cls > 0.05) score -= 5;

    return Math.max(0, score);
  });

  readonly performanceGrade = computed(() => {
    const score = this.performanceScore();
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  });

  readonly isGoodPerformance = computed(() => this.performanceScore() >= 80);
  readonly needsOptimization = computed(() => this.performanceScore() < 70);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Start monitoring performance
  startMonitoring() {
    if (!this.isBrowser) return;

    this._isMonitoring.set(true);
    this.observeWebVitals();
    this.observeNavigationTiming();
  }

  // Stop monitoring
  stopMonitoring() {
    this._isMonitoring.set(false);
  }

  // Update metrics manually
  updateMetrics(metrics: Partial<PerformanceMetrics>) {
    const current = this._metrics();
    this._metrics.set({ ...current, ...metrics });
    this._lastUpdate.set(new Date());
  }

  // Reset metrics
  resetMetrics() {
    this._metrics.set({
      lcp: 0,
      fid: 0,
      cls: 0,
      fcp: 0,
      tti: 0,
    });
    this._lastUpdate.set(null);
  }

  private observeWebVitals() {
    if (!this.isBrowser) return;

    // Observe LCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.updateMetrics({ lcp: lastEntry.startTime });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Observe FID
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fid = (entry as any).processingStart - entry.startTime;
        this.updateMetrics({ fid });
      });
    }).observe({ entryTypes: ['first-input'] });

    // Observe CLS
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let clsValue = 0;
      entries.forEach((entry) => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      });
      this.updateMetrics({ cls: clsValue });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private observeNavigationTiming() {
    if (!this.isBrowser) return;

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType(
        'navigation',
      )[0] as PerformanceNavigationTiming;

      // FCP
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
      if (fcpEntry) {
        this.updateMetrics({ fcp: fcpEntry.startTime });
      }

      // TTI (approximation)
      const tti = navigation.loadEventEnd - navigation.fetchStart;
      this.updateMetrics({ tti });
    });
  }

  // Get performance report
  getPerformanceReport() {
    const metrics = this._metrics();
    const score = this.performanceScore();
    const grade = this.performanceGrade();

    return {
      metrics,
      score,
      grade,
      isGood: this.isGoodPerformance(),
      needsOptimization: this.needsOptimization(),
      lastUpdate: this._lastUpdate(),
    };
  }
}
