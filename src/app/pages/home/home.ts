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
import { ThemeService } from '../../core/theme.service';
import { PerformanceService } from '../../core/performance.service';
import { SEOService } from '../../core/seo.service';
import { AnalyticsService } from '../../core/analytics.service';
import { AnimationsService } from '../../core/animations.service';
import { LoadingService } from '../../core/loading.service';
import { LayoutAnimationsService } from '../../core/layout-animations.service';


@Component({
  selector: 'app-home',
  imports: [Header, Footer, SocialButtons, CommonModule],
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

  // Technologies array for @for loop
  readonly technologies = [
    { key: 'angular', stagger: 1 },
    { key: 'typescript', stagger: 2 },
    { key: 'react', stagger: 3 },
    { key: 'nodejs', stagger: 4 },
    { key: 'ionic', stagger: 5 },
    { key: 'flutter', stagger: 6 },
    { key: 'aws', stagger: 7 },
    { key: 'figma', stagger: 8 },
    { key: 'docker', stagger: 1 }
  ];

  // Hire page properties
  readonly calendly = 'https://calendly.com/sachindilshan040/sachin-dilshan-angular-consulting';
  readonly email = 'mailto:sachindilshan040@gmail.com?subject=Project%20Inquiry';

  // Hire page data
  readonly plans = [
    {
      id: 'audit',
      title: 'hire.services.angularAudit.title',
      subtitle: 'hire.services.angularAudit.subtitle',
      price: 'US$499 fixed',
      cta: { label: 'Book audit', href: this.calendly },
      badges: ['Architecture', 'DX', 'Performance'],
      includes: [
        'Repo review & issue list',
        'Architecture diagram & recommendations',
        'DX improvements (linting, scripts, CI hints)',
        '1-hour handover call',
      ],
    },
    {
      id: 'perf',
      title: 'hire.services.performanceSprint.title',
      subtitle: 'hire.services.performanceSprint.subtitle',
      price: 'US$1,499 / week',
      cta: { label: 'Start sprint', href: this.calendly },
      badges: ['Core Web Vitals', 'SSR/Preload', 'Bundle split'],
      includes: [
        'Perf baseline + goals',
        'Critical-path fixes (SSR/hydration, preconnect, code-split)',
        'Before/after report',
        'Slack check-ins + 1 demo',
      ],
      best: true,
    },
    {
      id: 'ux',
      title: 'hire.services.uxPolish.title',
      subtitle: 'hire.services.uxPolish.subtitle',
      price: 'US$999 fixed',
      cta: { label: 'hire.services.uxPolish.cta', href: this.calendly },
      badges: ['Design System', 'A11y', 'Micro-animations'],
      includes: [
        'Token pass (colors, radius, shadow, spacing)',
        'Interactive states + micro-animations',
        'A11y quick-wins (labels, roles, contrast)',
        'Component QA checklist',
      ],
    },
    {
      id: 'coaching',
      title: 'hire.services.angularCoaching.title',
      subtitle: 'hire.services.angularCoaching.subtitle',
      price: 'US$129 / hour',
      cta: { label: 'Schedule session', href: this.calendly },
      badges: ['Pair Programming', 'Code Reviews', 'Training'],
      includes: [
        'Pair-programming & code reviews',
        'API contracts & state management',
        'Testing strategy',
        'Career & roadmap guidance',
      ],
    },
  ];

  readonly faq = signal([
    {
      q: 'hire.faq.howWeStart.q',
      a: 'hire.faq.howWeStart.a',
      open: true,
    },
    {
      q: 'hire.faq.tools.q',
      a: 'hire.faq.tools.a',
      open: false,
    },
    {
      q: 'hire.faq.async.q',
      a: 'hire.faq.async.a',
      open: false,
    },
    {
      q: 'hire.faq.payment.q',
      a: 'hire.faq.payment.a',
      open: false,
    },
  ]);

  toggleFaq(i: number) {
    const list = [...this.faq()];
    list[i] = { ...list[i], open: !list[i].open };
    this.faq.set(list);
  }

  private io?: IntersectionObserver;
  private mo?: MutationObserver;
  private readonly injector: EnvironmentInjector = inject(EnvironmentInjector);

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    public readonly themeService: ThemeService,
    private readonly performanceService: PerformanceService,
    private readonly seoService: SEOService,
    private readonly analyticsService: AnalyticsService,
    private readonly animationsService: AnimationsService,
    private readonly loadingService: LoadingService,
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
          console.log('Header element found:', !!header);
          if (header) {
            console.log('Header is loaded, initializing animations');
            this.initializeLayoutAnimations();
          } else {
            console.log('Header not found, retrying...');
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
        // Check if header is visible and properly rendered
        const header = this.host.nativeElement.querySelector('app-header');
        if (header) {
          console.log('Header is visible and ready for animations');
        } else {
          console.warn('Header not found during animation initialization');
        }

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
