import { Component } from '@angular/core';
import { Header } from '../../components/shared/header/header';
import { Footer } from '../../components/shared/footer/footer';
import { SocialButtons } from '../../components/social-buttons/social-buttons';
import { ProjectCard } from '../../components/project-card/project-card';

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
  imports: [Header, Footer, SocialButtons, ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
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
}
