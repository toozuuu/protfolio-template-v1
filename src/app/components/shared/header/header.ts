import { NgOptimizedImage, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import {ThemeService} from '../../../core/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(
    private readonly viewportScroller: ViewportScroller,
    public readonly themeService: ThemeService,
  ) {}

  scrollToSection(sectionId: string) {
    this.viewportScroller.scrollToAnchor(sectionId);
  }

  onViewResume() {
    window.open(
      'https://drive.google.com/uc?export=download&id=157tkQVbGHF1cjPO2neXGtc45U-PffBgU',
      '_blank',
      'noopener,noreferrer'
    );
  }

  toggleTheme() {
    this.themeService.toggle();
  }

  useSystemTheme() {
    this.themeService.useSystem();
  }
}
