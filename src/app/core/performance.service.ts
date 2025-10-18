import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Preload critical resources
   */
  preloadCriticalResources(): void {
    if (!this.isBrowser) return;

    // Preload critical images
    const criticalImages = [
      'assets/My_Photo.jpg',
      'assets/kr.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  /**
   * Optimize images with lazy loading
   */
  setupLazyLoading(): void {
    if (!this.isBrowser) return;

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset['src']) {
              img.src = img.dataset['src'];
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring(): void {
    if (!this.isBrowser) return;

    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      // This would require web-vitals library
      console.log('Performance monitoring setup');
    }
  }

  /**
   * Optimize animations for reduced motion
   */
  setupReducedMotion(): void {
    if (!this.isBrowser) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--dur', '0s');
    }
  }
}
