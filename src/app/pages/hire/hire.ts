import { Component, inject, signal } from '@angular/core';
import { Location } from '@angular/common';

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
  styleUrls: ['./hire.scss'],
  imports: [],
})
export class Hire {
  calendly = 'https://calendly.com/sachindilshan040/sachin-dilshan-angular-consulting';
  email = 'mailto:sachindilshan040@gmail.com?subject=Project%20Inquiry';

   private readonly loc = inject(Location);

  plans: Plan[] = [
    {
      id: 'audit',
      title: 'Angular Audit',
      subtitle: 'Code quality, architecture & DX review',
      price: 'US$499 fixed',
      cta: { label: 'Book audit', href: this.calendly },
      badges: ['Angular 17–20', 'Standalone', 'Signals'],
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
      subtitle: 'Metrics first: LCP, CLS, TTI',
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
      cta: { label: 'Polish my UI', href: this.calendly },
      badges: ['A11y', 'Design Tokens', 'Motion'],
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
      subtitle: 'Mentoring for teams or individuals',
      price: 'US$129 / hour',
      cta: { label: 'Schedule session', href: this.calendly },
      badges: ['Architecture', 'Testing', 'DevEx'],
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
