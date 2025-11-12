import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ImageOptimizationService {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Generate optimized image sources
  generateImageSources(src: string, alt: string, sizes: string = '100vw'): string {
    if (!this.isBrowser) return src;

    const baseName = src.replace(/\.[^/.]+$/, '');
    const extension = src.split('.').pop();

    // Generate WebP sources for modern browsers
    const webpSources = `
      <source srcset="${baseName}.webp" type="image/webp">
      <source srcset="${baseName}-2x.webp 2x" type="image/webp" media="(min-width: 768px)">
    `;

    // Generate responsive images
    const responsiveSources = `
      <source srcset="${baseName}-sm.${extension} 480w, ${baseName}-md.${extension} 768w, ${baseName}-lg.${extension} 1024w" sizes="${sizes}">
    `;

    return `
      <picture>
        ${webpSources}
        ${responsiveSources}
        <img src="${src}" alt="${alt}" loading="lazy" decoding="async">
      </picture>
    `;
  }

  // Lazy load images with intersection observer
  setupLazyLoading(): void {
    if (!this.isBrowser) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset['src']) {
            img.src = img.dataset['src'];
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Preload critical images
  preloadCriticalImages(): void {
    if (!this.isBrowser) return;

    const criticalImages = ['assets/My_Photo.jpg', 'assets/kr.png'];

    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // Generate responsive image sizes
  generateResponsiveSizes(baseSrc: string): { [key: string]: string } {
    const sizes = {
      sm: `${baseSrc}?w=480&h=480&fit=crop&auto=format`,
      md: `${baseSrc}?w=768&h=768&fit=crop&auto=format`,
      lg: `${baseSrc}?w=1024&h=1024&fit=crop&auto=format`,
      xl: `${baseSrc}?w=1920&h=1920&fit=crop&auto=format`,
    };

    return sizes;
  }

  // Optimize image loading
  optimizeImageLoading(img: HTMLImageElement): void {
    if (!this.isBrowser) return;

    // Add loading attributes
    img.loading = 'lazy';
    img.decoding = 'async';

    // Add error handling
    img.onerror = () => {
      console.warn(`Failed to load image: ${img.src}`);
      // Fallback to placeholder or default image
      img.src =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjhmYSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjQ3NDhiIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+';
    };
  }

  // Convert images to WebP format (for supported browsers)
  convertToWebP(src: string): string {
    if (!this.isBrowser) return src;

    // Check if browser supports WebP
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 1;
      canvas.height = 1;
      const dataURL = canvas.toDataURL('image/webp');
      if (dataURL.indexOf('data:image/webp') === 0) {
        return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      }
    }

    return src;
  }

  // Generate image placeholders
  generatePlaceholder(width: number, height: number, text: string = 'Loading'): string {
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="#f7f8fa"/>
        <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#64748b" text-anchor="middle" dy=".3em">${text}</text>
      </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
}
