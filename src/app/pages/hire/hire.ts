import { Component, inject, signal, ChangeDetectionStrategy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Location, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SEOService } from '../../core/seo.service';
import { LanguageService } from '../../core/language.service';
import { LoadingService } from '../../core/loading.service';
import { TranslateService } from '@ngx-translate/core';

type Plan = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  cta: { label: string; href: string };
  badges: string[];
  includes: string[];
  best?: boolean;
};

type FaqItem = { q: string; a: string; open: boolean };

@Component({
  standalone: true,
  selector: 'app-hire-page',
  templateUrl: './hire.html',
  styleUrls: ['./hire.css'],
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Hire implements OnInit {
  calendly = 'https://calendly.com/sachindilshan040/sachin-dilshan-angular-consulting';
  email = 'mailto:sachindilshan040@gmail.com?subject=Project%20Inquiry';

  private readonly loc = inject(Location);
  private readonly seoService = inject(SEOService);
  private readonly languageService = inject(LanguageService);
  private readonly loadingService = inject(LoadingService);
  private readonly translateService = inject(TranslateService);

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  ngOnInit(): void {
    console.log('Hire component initialized');
    
    if (isPlatformBrowser(this.platformId)) {
      // Show loading for hire page
      this.loadingService.startLoading(this.translateService.instant('ui.loadingHirePage'));
      
      this.seoService.setHirePageSEO(this.languageService.lang());
      
      // Complete loading after a short delay
      setTimeout(() => {
        this.loadingService.completeLoading();
        console.log('Hire page loading completed');
      }, 800);
    }
  }

  plans: Plan[] = [
    {
      id: 'audit',
      title: this.translateService.instant('hire.services.angularAudit.title'),
      subtitle: this.translateService.instant('hire.services.angularAudit.subtitle'),
      price: 'US$499 fixed',
      cta: { label: 'Book audit', href: this.calendly },
      badges: this.translateService.instant('hire.services.angularAudit.badges'),
      includes: [
        'Repo review & issue list',
        'Architecture diagram & recommendations',
        'DX improvements (linting, scripts, CI hints)',
        '1-hour handover call',
      ],
    },
    {
      id: 'perf',
      title: this.translateService.instant('hire.services.performanceSprint.title'),
      subtitle: this.translateService.instant('hire.services.performanceSprint.subtitle'),
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
      cta: { label: this.translateService.instant('hire.services.uxPolish.cta'), href: this.calendly },
      badges: this.translateService.instant('hire.services.uxPolish.badges'),
      includes: [
        'Token pass (colors, radius, shadow, spacing)',
        'Interactive states + micro-animations',
        'A11y quick-wins (labels, roles, contrast)',
        'Component QA checklist',
      ],
    },
    {
      id: 'coaching',
      title: this.translateService.instant('hire.services.angularCoaching.title'),
      subtitle: this.translateService.instant('hire.services.angularCoaching.subtitle'),
      price: 'US$129 / hour',
      cta: { label: 'Schedule session', href: this.calendly },
      badges: this.translateService.instant('hire.services.angularCoaching.badges'),
      includes: [
        'Pair-programming & code reviews',
        'API contracts & state management',
        'Testing strategy',
        'Career & roadmap guidance',
      ],
    },
  ];

  faq = signal<FaqItem[]>([
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

  toggle(i: number) {
    const list = [...this.faq()];
    list[i] = { ...list[i], open: !list[i].open };
    this.faq.set(list);
  }

  goBack() {
    this.loc.back();
  }
}
