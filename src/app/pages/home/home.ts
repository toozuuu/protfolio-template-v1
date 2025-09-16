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
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Header } from '../../components/shared/header/header';
import { Footer } from '../../components/shared/footer/footer';
import { SocialButtons } from '../../components/social-buttons/social-buttons';
import {TranslatePipe} from '@ngx-translate/core';

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-home',
  imports: [Header, Footer, SocialButtons, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  projects: Project[] = [
    {
      title: 'ngxsmk-otp-input',
      description:
        'A lightweight, standalone Angular 17+ OTP/PIN input component with SCSS theming, mobile-friendly autofill, masking, and full ReactiveForms support.',
      image: 'assets/kr.png',
      tags: [
        'i18n',
        'angular',
        'ssr',
        'phone-number',
        'phone',
        'rtl',
        'angular-components',
        'libphonenumber',
        'ngx',
        'reactive-forms',
        'telephone',
        'angular-forms',
        'intl-tel-input',
        'ui-component',
        'template-driven-forms',
        'standalone-components',
        'angular-17',
        'angular-18',
        'angular-19',
      ],
      liveDemoUrl: '',
      githubUrl: 'https://github.com/toozuuu/ngxsmk-otp-input',
    },
    {
      title: 'ngxsmk-skeleton-loader',
      description:
        'ngxsmk-skeleton-loader — Angular 17+ standalone skeleton loader (component + directive) with SCSS theming and animations (shimmer, pulse, wave).',
      image: 'assets/kr.png',
      tags: [
        'angular',
        'scss',
        'wave',
        'skeleton-loader',
        'ui-components',
        'pulse',
        'shimmer',
        'css-variables',
        'loading-state',
        'angular17',
        'angular-standalone',
        'placeholder-ui',
        'loading-ui',
        'ngxsmk',
      ],
      liveDemoUrl: '',
      githubUrl: 'https://github.com/toozuuu/ngxsmk-skeleton-loader',
    },
  ];

  expanded = new Set<string>();

  private io?: IntersectionObserver;
  private mo?: MutationObserver;
  private readonly injector: EnvironmentInjector = inject(EnvironmentInjector);

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  ngAfterViewInit(): void {
    afterNextRender(
      () => {
        if (!isPlatformBrowser(this.platformId)) return;

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

  isExpanded(id: string): boolean {
    return this.expanded.has(id);
  }

  toggle(id: string): void {
    this.isExpanded(id) ? this.expanded.delete(id) : this.expanded.add(id);
  }

  onPlayAudio() {
    const audio = new Audio();
    audio.src = 'assets/name_voice.mp3';
    audio.load();
    audio.play();
  }
}
