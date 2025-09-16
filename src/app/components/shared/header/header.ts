import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private readonly viewportScroller: ViewportScroller) {}

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
}
