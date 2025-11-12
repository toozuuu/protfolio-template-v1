import { ViewportScroller, CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  signal,
  computed,
  ChangeDetectorRef,
} from '@angular/core';
import { ThemeService } from '../../../core/theme.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Header implements OnInit, OnDestroy {
  private readonly _isScrolled = signal(false);
  private readonly _isMobileMenuOpen = signal(false);
  readonly isScrolled = this._isScrolled.asReadonly();
  readonly headerClasses = computed(() => (this.isScrolled() ? 'scrolled' : ''));
  readonly isDark = computed(() => this.themeService.isDark());
  readonly isMobileMenuOpen = this._isMobileMenuOpen.asReadonly();

  private scrollListener?: () => void;
  private isScrolling = false;
  private scrollTimeout?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly viewportScroller: ViewportScroller,
    public readonly themeService: ThemeService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.scrollListener = () => {
        try {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          this._isScrolled.set(scrollTop > 50);
          this.isScrolling = true;
          if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
          }
          this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
          }, 150);
        } catch (error) {
          // Silent error handling
        }
      };
      window.addEventListener('scroll', this.scrollListener, { passive: true });
    }
  }

  ngOnDestroy() {
    if (this.scrollListener && typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.scrollListener);
    }
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    this.closeMobileMenu();
  }

  scrollToSection(sectionId: string) {
    this.viewportScroller.scrollToAnchor(sectionId);
  }

  onViewResume() {
    window.open(
      'https://drive.google.com/uc?export=download&id=157tkQVbGHF1cjPO2neXGtc45U-PffBgU',
      '_blank',
      'noopener,noreferrer',
    );
  }

  private isToggling = false;

  toggleTheme(event?: Event | MouseEvent | TouchEvent) {
    if (this.isToggling) {
      return;
    }
    this.isToggling = true;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      if ('stopImmediatePropagation' in event) {
        event.stopImmediatePropagation();
      }
    }
    if (this.isScrolling) {
      setTimeout(() => {
        this.performToggle();
      }, 50);
    } else {
      this.performToggle();
    }
  }

  private performToggle() {
    try {
      this.themeService.toggle();
      this.cdr.detectChanges();
    } catch (error) {
      // Silent error handling
    } finally {
      setTimeout(() => {
        this.isToggling = false;
      }, 100);
    }
  }

  useSystemTheme() {
    this.themeService.useSystem();
  }

  toggleMobileMenu() {
    this._isMobileMenuOpen.update((open) => !open);
    if (typeof document !== 'undefined') {
      if (this._isMobileMenuOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  closeMobileMenu() {
    this._isMobileMenuOpen.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  scrollToSectionAndClose(sectionId: string) {
    this.scrollToSection(sectionId);
    this.closeMobileMenu();
  }
}
