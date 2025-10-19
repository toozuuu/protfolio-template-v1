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
import { isPlatformBrowser, CommonModule } from '@angular/common';
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
import { TranslateService } from '@ngx-translate/core';
import { LayoutAnimationsService } from '../../core/layout-animations.service';


@Component({
  selector: 'app-home',
  imports: [Header, Footer, SocialButtons, TranslatePipe, CommonModule],
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
    private readonly translateService: TranslateService,
    private readonly layoutAnimationsService: LayoutAnimationsService,
    private readonly cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  ngAfterViewInit(): void {
    afterNextRender(
      () => {
        if (!isPlatformBrowser(this.platformId)) return;

        // Show loading for home page initialization
        this.loadingService.startLoading(this.translateService.instant('ui.loadingHomePage'));

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

        // Initialize layout animations after ensuring header is loaded
        setTimeout(() => {
          // Double-check that header is properly loaded
          const header = this.host.nativeElement.querySelector('app-header');
          if (header) {
            this.initializeLayoutAnimations();
          } else {
            // Retry after a longer delay if header is not found
            setTimeout(() => {
              this.initializeLayoutAnimations();
            }, 300);
          }
        }, 500);

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
    this.layoutAnimationsService.destroy();
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

  private initializeLayoutAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Wait for DOM to be fully rendered before initializing animations
    setTimeout(() => {
      try {
        // Animate the entire page layout
        this.layoutAnimationsService.animatePageLayout(this.host);

        // Animate hero section specifically
        setTimeout(() => {
          this.layoutAnimationsService.animateHeroSection(this.host);
        }, 200);

        // Animate sections with stagger
        setTimeout(() => {
          this.layoutAnimationsService.animateSections(this.host);
        }, 400);

        // Animate cards and grid items
        setTimeout(() => {
          this.layoutAnimationsService.animateCards(this.host);
          this.layoutAnimationsService.animateGridItems(this.host);
        }, 600);

        // Animate text elements
        setTimeout(() => {
          this.layoutAnimationsService.animateTextElements(this.host);
        }, 800);

        // Animate images
        setTimeout(() => {
          this.layoutAnimationsService.animateImages(this.host);
        }, 1000);

        // Animate buttons
        setTimeout(() => {
          this.layoutAnimationsService.animateButtons(this.host);
        }, 1200);

        // Animate list items
        setTimeout(() => {
          this.layoutAnimationsService.animateListItems(this.host);
        }, 1400);
      } catch (error) {
        console.warn('Layout animations initialization failed:', error);
      }
    }, 100);
  }
}
