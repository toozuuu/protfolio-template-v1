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
import { isPlatformBrowser, CommonModule, ViewportScroller } from '@angular/common';
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
import { GitHubService, GitHubRepoStats } from '../../core/github.service';

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
    { key: 'angular', name: 'Angular', stagger: 1 },
    { key: 'typescript', name: 'TypeScript', stagger: 2 },
    { key: 'react', name: 'React', stagger: 3 },
    { key: 'nodejs', name: 'Node.js', stagger: 4 },
    { key: 'ionic', name: 'Ionic', stagger: 5 },
    { key: 'flutter', name: 'Flutter', stagger: 6 },
    { key: 'aws', name: 'AWS', stagger: 7 },
    { key: 'figma', name: 'Figma', stagger: 8 },
    { key: 'docker', name: 'Docker', stagger: 1 },
  ];

  // Hire page properties
  readonly calendly = 'https://calendly.com/sachindilshan040/sachin-dilshan-angular-consulting';
  readonly email = 'mailto:sachindilshan040@gmail.com?subject=Project%20Inquiry';

  // Experience data with full descriptions
  readonly experiences = signal([
    {
      id: 'wmp',
      company: 'We Make Platforms',
      role: 'Technical Lead - Frontend',
      period: 'Aug 2022 - Present',
      location: 'Remote',
      link: 'https://www.wemakeplatforms.io/',
      achievements: [
        'Spearheaded the development of front-end features using the Angular framework, playing a key role in delivering the majority of user interface components within project timelines.',
        'Translated UI designs from Figma and Zeplin into responsive, high-quality implementations that significantly enhanced user experience, as reflected in positive user feedback.',
        'Conducted detailed code reviews for junior developers, fostering a culture of collaboration and improving code quality by reducing issues identified after deployment.',
        'Implemented comprehensive testing strategies including unit tests and integration tests, resulting in a 40% reduction in production bugs and improved application stability.',
        'Collaborated with cross-functional teams including designers, product managers, and backend developers to ensure seamless integration and delivery of features that met both technical and business requirements.',
      ],
    },
    {
      id: 'epic',
      company: 'Epic Lanka',
      role: 'Software Engineer',
      period: 'Aug 2020 - Jul 2022',
      location: 'On-site',
      link: 'https://www.epic.lk/',
      achievements: [
        'Developed high-performance REST APIs for a JIRA ticketing application within a tight deadline of three weeks, ensuring seamless integration with existing systems and maintaining code quality standards.',
        'Designed and implemented a comprehensive admin panel using Angular, featuring advanced data visualization, user management, and real-time analytics that improved operational efficiency by 35%.',
        'Optimized database queries and implemented caching strategies, resulting in a 60% improvement in application response times and enhanced user experience.',
        'Collaborated with the QA team to establish automated testing pipelines, reducing manual testing time by 50% and ensuring consistent code quality across releases.',
      ],
    },
    {
      id: 'zincat',
      company: 'ZinCat Technology',
      role: 'Software Developer',
      period: 'Aug 2019 - Aug 2020',
      location: 'On-site',
      link: 'https://zincat.lk/',
      achievements: [
        'Designed and developed a robust business logic execution front end for a local e-commerce platform, enhancing user experience and increasing engagement by an estimated 25%.',
        'Implemented responsive design principles and mobile-first development approach, ensuring optimal performance across all devices and screen sizes.',
        'Integrated third-party payment gateways and shipping APIs, streamlining the checkout process and reducing cart abandonment rates by 30%.',
        'Collaborated with the design team to create intuitive user interfaces that improved user satisfaction scores and reduced support ticket volume by 40%.',
      ],
    },
    {
      id: 'ceyentra',
      company: 'Ceyentra Technologies',
      role: 'Internship',
      period: 'Jan 2019 - Aug 2019',
      location: 'On-site',
      link: 'https://ceyentra.com/',
      achievements: [
        'Implemented software systems utilizing the Ionic framework for app development, contributing to a 30% increase in project delivery efficiency during the tenure at the company.',
        'Developed cross-platform mobile applications that achieved 95% code reusability between iOS and Android platforms, significantly reducing development time and maintenance costs.',
        'Collaborated with the backend team to design and implement RESTful APIs, ensuring seamless data flow and optimal performance for mobile applications.',
        'Participated in agile development processes, contributing to sprint planning, daily standups, and retrospective meetings that improved team productivity and project delivery timelines.',
      ],
    },
  ]);

  // Hire page data
  readonly plans = [
    {
      id: 'audit',
      title: 'Angular Audit',
      subtitle: 'Code review & architecture recommendations',
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
      title: 'Performance Sprint',
      subtitle: 'Core Web Vitals & SSR optimization',
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
      title: 'UX Polish Pack',
      subtitle: 'Design tokens, spacing, states, a11y',
      price: 'US$999 fixed',
      cta: { label: 'Get quote', href: this.calendly },
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
      title: 'Angular Coaching',
      subtitle: 'Pair programming & team training',
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
      q: 'How do we start?',
      a: 'Book a 30-minute intro call (free). We align on scope, timeline, and deliverables. Then I send a simple one-page SoW.',
      open: true,
    },
    {
      q: 'What tools do you use?',
      a: 'Angular 20, SSR, Signals, Nx, Storybook, Playwright, Lighthouse, WebPageTest, and your existing stack (GitHub Actions, EKS, etc.).',
      open: false,
    },
    {
      q: 'Do you work async?',
      a: 'Yes. I run sprints and share progress in a dedicated Slack/Teams channel with a daily update and weekly demo.',
      open: false,
    },
    {
      q: 'Payment & billing?',
      a: 'Fixed-price for packs; hourly for coaching. 50% upfront for fixed packs. Stripe or bank transfer.',
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

  // GitHub repository stats signals
  readonly tokiForgeStats = signal<GitHubRepoStats>({
    stars: 0,
    forks: 0,
    loading: true,
    error: false,
  });
  readonly ngxsmkDatepickerStats = signal<GitHubRepoStats>({
    stars: 0,
    forks: 0,
    loading: true,
    error: false,
  });
  readonly ngxsmkTelInputStats = signal<GitHubRepoStats>({
    stars: 0,
    forks: 0,
    loading: true,
    error: false,
  });
  readonly ngxsmkDatatableStats = signal<GitHubRepoStats>({
    stars: 0,
    forks: 0,
    loading: true,
    error: false,
  });

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
    private readonly viewportScroller: ViewportScroller,
    private readonly githubService: GitHubService,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {}

  ngAfterViewInit(): void {
    // Fetch GitHub stats for all repositories
    this.fetchGitHubStats();

    afterNextRender(
      () => {
        if (!isPlatformBrowser(this.platformId)) return;

        // Show loading for home page initialization
        this.loadingService.startLoading('Loading home page...');

        // Initialize SEO
        this.seoService.setHomePageSEO('en');

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
          { threshold: 0.12 },
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
      { injector: this.injector },
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
    // Force change detection for OnPush strategy
    this.cdr.detectChanges();
  }

  onPlayAudio() {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const audio = new Audio();
      audio.src = 'assets/name_voice.mp3';
      audio.load();

      // Handle audio playback errors silently
      audio.addEventListener('error', () => {
        // Audio file not found or failed to load - fail silently
      });

      // Play audio with error handling
      audio.play().catch(() => {
        // User interaction may be required or autoplay blocked - fail silently
      });
    } catch (error) {
      // Fail silently if audio creation fails
    }
  }

  scrollToSection(sectionId: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    this.viewportScroller.scrollToAnchor(sectionId);
  }

  /**
   * Fetch GitHub repository statistics for all projects
   */
  private async fetchGitHubStats(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      // Fetch all repository stats in parallel
      const [tokiForge, datepicker, telInput, datatable] = await Promise.all([
        this.githubService.getRepoStats('TokiForge', 'tokiforge'),
        this.githubService.getRepoStats('NGXSMK', 'ngxsmk-datepicker'),
        this.githubService.getRepoStats('NGXSMK', 'ngxsmk-tel-input'),
        this.githubService.getRepoStats('NGXSMK', 'ngxsmk-datatable'),
      ]);

      // Update signals
      this.tokiForgeStats.set(tokiForge);
      this.ngxsmkDatepickerStats.set(datepicker);
      this.ngxsmkTelInputStats.set(telInput);
      this.ngxsmkDatatableStats.set(datatable);

      // Trigger change detection
      this.cdr.detectChanges();
    } catch (error) {
      // Silently handle errors - stats will remain in loading state
    }
  }

  private initializeLayoutAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Wait for DOM to be fully rendered before initializing animations
    setTimeout(() => {
      try {
        // Check if header is visible and properly rendered
        const header = this.host.nativeElement.querySelector('app-header');
        if (!header) {
          // Header not found, but continue with animations
          return;
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
