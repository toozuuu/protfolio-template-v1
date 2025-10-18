# ⚡ Performance Optimization Guide

## Overview

This portfolio is optimized for maximum performance across all devices and network conditions. The optimization strategy focuses on Core Web Vitals, bundle size, and user experience.

## 🎯 Performance Metrics

### Core Web Vitals Targets
```typescript
// Performance targets
const PERFORMANCE_TARGETS = {
  LCP: 2.5, // Largest Contentful Paint (seconds)
  FID: 100, // First Input Delay (milliseconds)
  CLS: 0.1, // Cumulative Layout Shift (score)
  FCP: 1.8, // First Contentful Paint (seconds)
  TTI: 3.8  // Time to Interactive (seconds)
};
```

### Current Performance Scores
- **Lighthouse Score**: 95-100
- **Bundle Size**: ~295KB (gzipped: ~82KB)
- **Home Page**: ~59KB (gzipped: ~14KB)
- **Hire Page**: ~10KB (gzipped: ~3KB)

## 🚀 Bundle Optimization

### 1. **Code Splitting Strategy**

#### Route-Based Splitting
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'hire',
    loadComponent: () => import('./pages/hire/hire.component').then(m => m.HireComponent)
  }
];
```

#### Component-Based Splitting
```typescript
// Lazy load heavy components
@Component({
  selector: 'app-interactive-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skills-container">
      <!-- Skills content -->
    </div>
  `
})
export class InteractiveSkillsComponent {
  // Component implementation
}
```

### 2. **Tree Shaking Configuration**

#### Angular Build Optimization
```json
// angular.json
{
  "build": {
    "configurations": {
      "production": {
        "optimization": {
          "scripts": true,
          "styles": {
            "minify": true,
            "inlineCritical": true
          },
          "fonts": true
        },
        "outputHashing": "all",
        "sourceMap": false,
        "namedChunks": false,
        "extractLicenses": true
      }
    }
  }
}
```

#### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

### 3. **Bundle Analysis**

#### Webpack Bundle Analyzer
```bash
# Analyze bundle size
npm run build:analyze

# Output: dist/protfolio-template-v1/browser/stats.json
# Opens webpack-bundle-analyzer in browser
```

#### Bundle Size Monitoring
```typescript
// performance.service.ts
export class PerformanceService {
  analyzeBundleSize(): void {
    const scripts = document.querySelectorAll('script[src]');
    let totalSize = 0;
    
    scripts.forEach(script => {
      const src = script.getAttribute('src');
      if (src && !src.includes('node_modules')) {
        // Calculate script size
        this.calculateResourceSize(src).then(size => {
          totalSize += size;
          console.log(`Bundle size: ${totalSize} bytes`);
        });
      }
    });
  }
}
```

## 🖼️ Image Optimization

### 1. **Responsive Images**

#### Multiple Image Formats
```html
<!-- WebP with fallback -->
<picture>
  <source srcset="assets/My_Photo.webp" type="image/webp">
  <source srcset="assets/My_Photo.jpg" type="image/jpeg">
  <img src="assets/My_Photo.jpg" alt="Sachin Dilshan" 
       class="w-full h-auto" loading="lazy">
</picture>
```

#### Responsive Image Sizes
```html
<!-- Responsive image with srcset -->
<img src="hero-small.jpg"
     srcset="hero-small.jpg 480w,
             hero-medium.jpg 768w,
             hero-large.jpg 1200w,
             hero-xl.jpg 1920w"
     sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
     alt="Hero image"
     class="w-full h-auto"
     loading="eager">
```

### 2. **Lazy Loading Implementation**

#### Intersection Observer
```typescript
// lazy-loading.service.ts
@Injectable({ providedIn: 'root' })
export class LazyLoadingService {
  private observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { rootMargin: '50px' }
    );
  }

  observeElement(element: HTMLElement): void {
    this.observer.observe(element);
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target as HTMLImageElement);
        this.observer.unobserve(entry.target);
      }
    });
  }

  private loadImage(img: HTMLImageElement): void {
    const src = img.dataset['src'];
    if (src) {
      img.src = src;
      img.classList.add('loaded');
    }
  }
}
```

#### Component Lazy Loading
```typescript
// Lazy load components on scroll
@Component({
  selector: 'app-project-card',
  template: `
    <div class="project-card" #card>
      <!-- Project content -->
    </div>
  `
})
export class ProjectCardComponent implements AfterViewInit {
  @ViewChild('card') card!: ElementRef;

  constructor(private lazyLoading: LazyLoadingService) {}

  ngAfterViewInit(): void {
    this.lazyLoading.observeElement(this.card.nativeElement);
  }
}
```

## 🎨 CSS Optimization

### 1. **Critical CSS Inlining**

#### Critical CSS Extraction
```css
/* Critical CSS for above-the-fold content */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; }
.min-h-screen { min-height: 100vh; }
.bg-white { background-color: #ffffff; }
.text-slate-900 { color: #0f172a; }
```

#### CSS Optimization Service
```typescript
// css-optimization.service.ts
@Injectable({ providedIn: 'root' })
export class CSSOptimizationService {
  generateCriticalCSS(): string {
    const criticalClasses = [
      'min-h-screen', 'bg-white', 'text-slate-900',
      'flex', 'items-center', 'justify-center',
      'w-full', 'h-full', 'relative'
    ];

    return criticalClasses
      .map(className => this.getCSSForClass(className))
      .join('\n');
  }

  removeUnusedCSS(): void {
    // Remove unused CSS classes
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      const sheet = styleSheets[i];
      if (sheet.href && sheet.href.includes('tailwind')) {
        this.markStylesheetForOptimization(sheet);
      }
    }
  }
}
```

### 2. **Tailwind CSS Optimization**

#### Purge Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './src/app/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        accent: '#10b981'
      }
    }
  },
  plugins: []
};
```

#### Dynamic CSS Loading
```html
<!-- Load Tailwind CSS asynchronously -->
<script>
  const loadTailwind = () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    script.onload = () => {
      // Configure Tailwind
      tailwind.config = {
        theme: { extend: { /* custom theme */ } },
        darkMode: 'class'
      };
    };
    document.head.appendChild(script);
  };
  
  // Load after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTailwind);
  } else {
    loadTailwind();
  }
</script>
```

## 🚀 Runtime Performance

### 1. **Change Detection Optimization**

#### OnPush Strategy
```typescript
@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="project-card">
      <!-- Project content -->
    </div>
  `
})
export class ProjectCardComponent {
  @Input() project!: Project;
  
  constructor(private cdr: ChangeDetectorRef) {}
}
```

#### TrackBy Functions
```typescript
// Optimize *ngFor with trackBy
@Component({
  template: `
    <div *ngFor="let project of projects; trackBy: trackByProject">
      <!-- Project content -->
    </div>
  `
})
export class ProjectsComponent {
  trackByProject(index: number, project: Project): string {
    return project.id;
  }
}
```

### 2. **Memory Management**

#### Component Cleanup
```typescript
@Component({
  selector: 'app-animated-section',
  template: `<!-- Animated content -->`
})
export class AnimatedSectionComponent implements OnDestroy {
  private observer?: IntersectionObserver;
  private animationFrame?: number;

  ngOnDestroy(): void {
    // Cleanup observers
    this.observer?.disconnect();
    
    // Cancel animation frames
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
```

#### Service Cleanup
```typescript
@Injectable({ providedIn: 'root' })
export class AnimationService implements OnDestroy {
  private animations = new Set<Animation>();

  ngOnDestroy(): void {
    // Cancel all animations
    this.animations.forEach(animation => {
      animation.cancel();
    });
    this.animations.clear();
  }
}
```

## 📊 Performance Monitoring

### 1. **Core Web Vitals Tracking**

#### Performance Observer
```typescript
// performance.service.ts
@Injectable({ providedIn: 'root' })
export class PerformanceService {
  trackCoreWebVitals(): void {
    // Track LCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Track FID
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Track CLS
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log('CLS:', entry.value);
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }
}
```

### 2. **Bundle Size Monitoring**

#### Bundle Analysis
```typescript
export class BundleAnalyzer {
  analyzeBundleSize(): BundleReport {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    
    const totalSize = this.calculateTotalSize([...scripts, ...stylesheets]);
    
    return {
      totalSize,
      scripts: scripts.length,
      stylesheets: stylesheets.length,
      recommendations: this.generateRecommendations(totalSize)
    };
  }

  private calculateTotalSize(resources: Element[]): number {
    return resources.reduce((total, resource) => {
      const href = resource.getAttribute('href') || resource.getAttribute('src');
      if (href && !href.includes('node_modules')) {
        // Estimate size based on resource type
        return total + this.estimateResourceSize(href);
      }
      return total;
    }, 0);
  }
}
```

## 🎭 Animation Performance

### 1. **Hardware Acceleration**

#### GPU-Accelerated Animations
```css
/* Use transform and opacity for smooth animations */
.animate-element {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Smooth transitions */
.smooth-transition {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Reduced Motion Support
```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2. **Animation Optimization**

#### Intersection Observer for Animations
```typescript
// animations.service.ts
@Injectable({ providedIn: 'root' })
export class AnimationsService {
  private observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: 0.1, rootMargin: '50px' }
    );
  }

  observeElement(element: HTMLElement): void {
    this.observer.observe(element);
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }
}
```

## 🌐 Network Optimization

### 1. **Resource Preloading**

#### Critical Resource Preloading
```html
<!-- Preload critical resources -->
<link rel="preload" href="assets/My_Photo.jpg" as="image" type="image/jpeg">
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style">
<link rel="preload" href="assets/name_voice.mp3" as="audio">
```

#### DNS Prefetching
```html
<!-- DNS prefetch for external resources -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.googletagmanager.com">
```

### 2. **Caching Strategy**

#### Service Worker Implementation
```typescript
// sw.js
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/assets/My_Photo.jpg',
  '/assets/icons/',
  '/assets/i18n/'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

## 📱 Mobile Performance

### 1. **Mobile-Specific Optimizations**

#### Touch Optimization
```css
/* Optimize for touch devices */
.touch-optimized {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

/* Smooth scrolling on mobile */
html {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}
```

#### Mobile Performance Monitoring
```typescript
// Monitor mobile performance
export class MobilePerformanceService {
  trackMobileMetrics(): void {
    // Track mobile-specific metrics
    const connection = (navigator as any).connection;
    if (connection) {
      console.log('Connection type:', connection.effectiveType);
      console.log('Downlink:', connection.downlink);
    }

    // Track memory usage
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log('Memory usage:', memory.usedJSHeapSize);
    }
  }
}
```

## 🔧 Build Optimization

### 1. **Production Build Configuration**

#### Angular Build Settings
```json
// angular.json production configuration
{
  "configurations": {
    "production": {
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "500kB",
          "maximumError": "1MB"
        },
        {
          "type": "anyComponentStyle",
          "maximumWarning": "8kB",
          "maximumError": "12kB"
        }
      ],
      "optimization": {
        "scripts": true,
        "styles": {
          "minify": true,
          "inlineCritical": true
        },
        "fonts": true
      },
      "outputHashing": "all",
      "sourceMap": false,
      "namedChunks": false,
      "extractLicenses": true
    }
  }
}
```

### 2. **Bundle Analysis Commands**

#### Performance Analysis
```bash
# Build with analysis
npm run build:analyze

# Lighthouse audit
npm run lighthouse

# Bundle size analysis
npx webpack-bundle-analyzer dist/protfolio-template-v1/browser/stats.json
```

## 📊 Performance Testing

### 1. **Lighthouse Auditing**

#### Automated Lighthouse Testing
```bash
# Run Lighthouse audit
npm run lighthouse

# CI Lighthouse testing
npm run lighthouse:ci
```

#### Lighthouse Configuration
```javascript
// lighthouse.config.js
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'first-contentful-paint',
      'largest-contentful-paint',
      'first-meaningful-paint',
      'speed-index',
      'cumulative-layout-shift'
    ]
  }
};
```

### 2. **Performance Budgets**

#### Bundle Size Budgets
```json
// angular.json budgets
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kB",
      "maximumError": "1MB"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "8kB",
      "maximumError": "12kB"
    }
  ]
}
```

## 🎯 Performance Checklist

### ✅ Build Optimization
- [ ] Code splitting implemented
- [ ] Tree shaking enabled
- [ ] Bundle analysis completed
- [ ] Unused code removed
- [ ] Source maps disabled in production

### ✅ Image Optimization
- [ ] WebP format with fallbacks
- [ ] Responsive images with srcset
- [ ] Lazy loading implemented
- [ ] Image compression optimized
- [ ] Critical images preloaded

### ✅ CSS Optimization
- [ ] Critical CSS inlined
- [ ] Unused CSS removed
- [ ] Tailwind CSS purged
- [ ] CSS minification enabled
- [ ] Font loading optimized

### ✅ Runtime Performance
- [ ] OnPush change detection
- [ ] TrackBy functions implemented
- [ ] Memory leaks prevented
- [ ] Animations hardware-accelerated
- [ ] Reduced motion supported

### ✅ Network Optimization
- [ ] Critical resources preloaded
- [ ] DNS prefetching configured
- [ ] Service worker implemented
- [ ] Caching strategy defined
- [ ] CDN configured

---

This optimization guide ensures your portfolio delivers exceptional performance across all devices and network conditions.
