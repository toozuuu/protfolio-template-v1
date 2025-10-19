import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  EnvironmentInjector,
  inject,
  afterNextRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  signal,
  computed,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Header } from '../../components/shared/header/header';
import { Footer } from '../../components/shared/footer/footer';
import { SocialButtons } from '../../components/social-buttons/social-buttons';
import {TranslatePipe} from '@ngx-translate/core';
import { ThemeService } from '../../core/theme.service';
import { PerformanceService } from '../../core/performance.service';
import { SEOService } from '../../core/seo.service';
import { LanguageService } from '../../core/language.service';
import { AnalyticsService } from '../../core/analytics.service';
import { AnimationsService } from '../../core/animations.service';
import { LoadingService } from '../../core/loading.service';


@Component({
  selector: 'app-home',
  imports: [Header, Footer, SocialButtons, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements AfterViewInit, OnDestroy {
  // Signal for expanded sections
  private readonly _expanded = signal<Set<string>>(new Set());
  
  // Computed signals for expansion state
  readonly expanded = this._expanded.asReadonly();
  readonly hasExpandedSections = computed(() => this._expanded().size > 0);

  private io?: IntersectionObserver;
  private mo?: MutationObserver;
  private readonly injector: EnvironmentInjector = inject(EnvironmentInjector);

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    public readonly themeService: ThemeService,
    private readonly performanceService: PerformanceService,
    private readonly seoService: SEOService,
    private readonly languageService: LanguageService,
    private readonly analyticsService: AnalyticsService,
    private readonly animationsService: AnimationsService,
    private readonly loadingService: LoadingService,
    private readonly cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  ngAfterViewInit(): void {
    afterNextRender(
      () => {
        if (!isPlatformBrowser(this.platformId)) return;

        // Show loading for home page initialization
        this.loadingService.startLoading('Loading home page...');

        // Initialize SEO
        this.seoService.setHomePageSEO(this.languageService.lang());

        // Initialize performance optimizations
        this.performanceService.preloadCriticalResources();
        this.performanceService.setupLazyLoading();
        this.performanceService.setupPerformanceMonitoring();
        this.performanceService.setupReducedMotion();

        // Fix back/forward cache restoration
        this.setupBFCacheOptimization();

        document.documentElement.classList.add('js');

        if (!('IntersectionObserver' in window)) return;

        const root = this.host.nativeElement;

        this.io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                e.target.classList.add('in');
                this.io?.unobserve(e.target);
              }
            }
          },
          { threshold: 0.12 }
        );

        const observeAll = () => {
          root.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((el) => {
            this.io!.observe(el);
          });
        };

        requestAnimationFrame(observeAll);

        this.mo = new MutationObserver((mutations) => {
          for (const m of mutations) {
            m.addedNodes.forEach((n) => {
              if (!(n instanceof HTMLElement)) return;
              if (n.matches?.('.reveal') && !n.classList.contains('in')) {
                this.io?.observe(n);
              }
              n.querySelectorAll?.('.reveal:not(.in)').forEach((child) => {
                this.io?.observe(child as Element);
              });
            });
          }
        });

        this.mo.observe(root, { childList: true, subtree: true });

        // Complete loading after initialization
        setTimeout(() => {
          this.loadingService.completeLoading();
        }, 1000);
      },
      { injector: this.injector }
    );
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    this.mo?.disconnect();
    this.io = undefined;
    this.mo = undefined;
  }

  private setupBFCacheOptimization(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Handle page visibility changes (back/forward cache)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        // Page is visible again (restored from cache)
        this.handlePageRestore();
      }
    });

    // Handle page show event (back/forward navigation)
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        // Page was restored from back/forward cache
        this.handlePageRestore();
      }
    });

    // Handle page hide event
    window.addEventListener('pagehide', (event) => {
      if (event.persisted) {
        // Page is being cached for back/forward navigation
        this.handlePageCache();
      }
    });
  }

  private handlePageRestore(): void {
    // Reinitialize components that might have been reset
    this.performanceService.setupLazyLoading();
    this.performanceService.setupPerformanceMonitoring();
    
    // Reinitialize animations
    if (this.animationsService) {
      this.animationsService.initializeScrollAnimations();
    }
    
    // Reinitialize analytics
    if (this.analyticsService) {
      this.analyticsService.trackPageView('home-restored');
    }
  }

  private handlePageCache(): void {
    // Clean up resources before caching
    this.io?.disconnect();
    this.mo?.disconnect();
  }

  isExpanded(id: string): boolean {
    return this._expanded().has(id);
  }

  toggle(id: string): void {
    const current = this._expanded();
    const newSet = new Set(current);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    this._expanded.set(newSet);
  }

  onPlayAudio() {
    const audio = new Audio();
    audio.src = 'assets/name_voice.mp3';
    audio.load();
    audio.play();
  }
}
