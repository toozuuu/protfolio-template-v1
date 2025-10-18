import { ViewportScroller, CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, signal, computed } from '@angular/core';
import {ThemeService} from '../../../core/theme.service';
import {LanguageService} from '../../../core/language.service';
import {FormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements OnInit, OnDestroy {
  // Signal for scroll state
  private readonly _isScrolled = signal(false);
  
  // Computed signals for scroll-based styling
  readonly isScrolled = this._isScrolled.asReadonly();
  readonly headerClasses = computed(() => 
    this.isScrolled() ? 'scrolled' : ''
  );
  
  // Computed signals for theme and language
  readonly isDark = computed(() => this.themeService.isDark());
  readonly currentLang = computed(() => this.lang.lang());
  
  private scrollListener?: () => void;

  constructor(
    private readonly viewportScroller: ViewportScroller,
    public readonly themeService: ThemeService,
    public readonly lang: LanguageService
  ) {}

  ngOnInit() {
    // Check if we're in browser environment
    if (typeof window !== 'undefined') {
      this.scrollListener = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        this._isScrolled.set(scrollTop > 50);
      };

      // Use passive listener for better performance
      window.addEventListener('scroll', this.scrollListener, { passive: true });
    }
  }

  ngOnDestroy() {
    if (this.scrollListener && typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

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
