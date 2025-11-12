import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Location, isPlatformBrowser, CommonModule } from '@angular/common';
import { SEOService } from '../../core/seo.service';
import { LoadingService } from '../../core/loading.service';

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
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Hire implements OnInit {
  calendly = 'https://calendly.com/sachindilshan040/sachin-dilshan-angular-consulting';
  email = 'mailto:sachindilshan040@gmail.com?subject=Project%20Inquiry';

  private readonly loc = inject(Location);
  private readonly seoService = inject(SEOService);
  private readonly loadingService = inject(LoadingService);

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}

  ngOnInit(): void {
    console.log('Hire component initialized');

    if (isPlatformBrowser(this.platformId)) {
      // Show loading for hire page
      this.loadingService.startLoading('Loading hire page...');

      this.seoService.setHirePageSEO('en');

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

  goBack() {
    this.loc.back();
  }

  toggle(index: number) {
    const currentFaq = this.faq();
    const updatedFaq = currentFaq.map((item, i) => ({
      ...item,
      open: i === index ? !item.open : false,
    }));
    this.faq.set(updatedFaq);
  }
}
