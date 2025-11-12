import { Injectable, ElementRef, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutAnimationsService {
  private renderer: Renderer2;
  private observer: IntersectionObserver | null = null;
  private animatedElements = new Set<Element>();

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initializeIntersectionObserver();
  }

  private initializeIntersectionObserver(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animateElement(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        },
      );
    }
  }

  private animateElement(element: Element): void {
    if (this.animatedElements.has(element)) return;

    try {
      this.animatedElements.add(element);
      this.renderer.addClass(element, 'animate-in');

      // Remove observer after animation
      if (this.observer) {
        this.observer.unobserve(element);
      }
    } catch (error) {
      console.warn('Animation failed for element:', element, error);
    }
  }

  /**
   * Animate elements on scroll
   */
  observeElement(
    element: ElementRef | Element,
    animationClass: string = 'animate-on-scroll',
  ): void {
    try {
      const el = element instanceof ElementRef ? element.nativeElement : element;

      if (!el) return;

      // Add initial animation class
      this.renderer.addClass(el, animationClass);

      // Start observing
      if (this.observer) {
        this.observer.observe(el);
      } else {
        // Fallback for browsers without IntersectionObserver
        setTimeout(() => this.animateElement(el), 100);
      }
    } catch (error) {
      console.warn('Failed to observe element:', error);
    }
  }

  /**
   * Animate multiple elements with stagger
   */
  observeElements(
    elements: (ElementRef | Element)[],
    animationClass: string = 'animate-on-scroll',
    staggerDelay: number = 100,
  ): void {
    elements.forEach((element, index) => {
      const el = element instanceof ElementRef ? element.nativeElement : element;

      if (!el) return;

      // Add stagger delay
      const delay = index * staggerDelay;

      setTimeout(() => {
        this.observeElement(el, animationClass);
      }, delay);
    });
  }

  /**
   * Animate grid items
   */
  animateGridItems(container: ElementRef | Element, itemSelector: string = '.grid-item'): void {
    const containerEl = container instanceof ElementRef ? container.nativeElement : container;

    if (!containerEl) return;

    const items = containerEl.querySelectorAll(itemSelector);
    this.observeElements(Array.from(items), 'animate-grid-item', 150);
  }

  /**
   * Animate cards
   */
  animateCards(container: ElementRef | Element, cardSelector: string = '.card'): void {
    const containerEl = container instanceof ElementRef ? container.nativeElement : container;

    if (!containerEl) return;

    const cards = containerEl.querySelectorAll(cardSelector);
    this.observeElements(Array.from(cards), 'animate-card', 200);
  }

  /**
   * Animate text elements
   */
  animateTextElements(
    container: ElementRef | Element,
    textSelector: string = 'h1, h2, h3, p',
  ): void {
    const containerEl = container instanceof ElementRef ? container.nativeElement : container;

    if (!containerEl) return;

    const textElements = containerEl.querySelectorAll(textSelector);
    this.observeElements(Array.from(textElements), 'animate-text-reveal', 100);
  }

  /**
   * Animate images
   */
  animateImages(container: ElementRef | Element, imageSelector: string = 'img'): void {
    const containerEl = container instanceof ElementRef ? container.nativeElement : container;

    if (!containerEl) return;

    const images = containerEl.querySelectorAll(imageSelector);
    this.observeElements(Array.from(images), 'animate-image-reveal', 150);
  }

  /**
   * Animate buttons
   */
  animateButtons(container: ElementRef | Element, buttonSelector: string = 'button, .btn'): void {
    const containerEl = container instanceof ElementRef ? container.nativeElement : container;

    if (!containerEl) return;

    const buttons = containerEl.querySelectorAll(buttonSelector);
    this.observeElements(Array.from(buttons), 'animate-button', 100);
  }

  /**
   * Animate form fields
   */
  animateFormFields(
    container: ElementRef | Element,
    fieldSelector: string = 'input, textarea, select',
  ): void {
    const containerEl = container instanceof ElementRef ? container.nativeElement : container;

    if (!containerEl) return;

    const fields = containerEl.querySelectorAll(fieldSelector);
    this.observeElements(Array.from(fields), 'animate-form-field', 100);
  }

  /**
   * Animate navigation items
   */
  animateNavItems(container: ElementRef | Element, navSelector: string = 'nav a'): void {
    const containerEl = container instanceof ElementRef ? container.nativeElement : container;

    if (!containerEl) return;

    const navItems = containerEl.querySelectorAll(navSelector);
    this.observeElements(Array.from(navItems), 'animate-nav-item', 50);
  }

  /**
   * Animate hero section
   */
  animateHeroSection(container: ElementRef | Element): void {
    const containerEl = container instanceof ElementRef ? container.nativeElement : container;

    if (!containerEl) return;

    // Animate hero content
    const content = containerEl.querySelector('.hero-content, .hero-text');
    if (content) {
      this.observeElement(content, 'animate-hero-content');
    }

    // Animate hero image
    const image = containerEl.querySelector('.hero-image, img');
    if (image) {
      this.observeElement(image, 'animate-hero-image');
    }
  }

  /**
   * Animate sections
   */
  animateSections(container: ElementRef | Element, sectionSelector: string = 'section'): void {
    const containerEl = container instanceof ElementRef ? container.nativeElement : container;

    if (!containerEl) return;

    const sections = containerEl.querySelectorAll(sectionSelector);
    this.observeElements(Array.from(sections), 'animate-section', 200);
  }

  /**
   * Animate list items
   */
  animateListItems(container: ElementRef | Element, listSelector: string = 'li'): void {
    const containerEl = container instanceof ElementRef ? container.nativeElement : container;

    if (!containerEl) return;

    const listItems = containerEl.querySelectorAll(listSelector);
    this.observeElements(Array.from(listItems), 'animate-list-item', 100);
  }

  /**
   * Animate modal
   */
  animateModal(modal: ElementRef | Element): void {
    const modalEl = modal instanceof ElementRef ? modal.nativeElement : modal;

    if (!modalEl) return;

    this.renderer.addClass(modalEl, 'animate-modal');

    // Trigger animation
    setTimeout(() => {
      this.renderer.addClass(modalEl, 'animate-in');
    }, 10);
  }

  /**
   * Animate loading spinner
   */
  animateLoading(loading: ElementRef | Element): void {
    const loadingEl = loading instanceof ElementRef ? loading.nativeElement : loading;

    if (!loadingEl) return;

    this.renderer.addClass(loadingEl, 'animate-loading');

    // Trigger animation
    setTimeout(() => {
      this.renderer.addClass(loadingEl, 'animate-in');
    }, 10);
  }

  /**
   * Apply page enter animation
   */
  animatePageEnter(element: ElementRef | Element): void {
    const el = element instanceof ElementRef ? element.nativeElement : element;

    if (!el) return;

    this.renderer.addClass(el, 'animate-page-enter');
  }

  /**
   * Apply page exit animation
   */
  animatePageExit(element: ElementRef | Element): void {
    const el = element instanceof ElementRef ? element.nativeElement : element;

    if (!el) return;

    this.renderer.addClass(el, 'animate-page-exit');
  }

  /**
   * Apply specific animation class
   */
  applyAnimation(element: ElementRef | Element, animationClass: string): void {
    const el = element instanceof ElementRef ? element.nativeElement : element;

    if (!el) return;

    this.renderer.addClass(el, animationClass);
  }

  /**
   * Remove animation class
   */
  removeAnimation(element: ElementRef | Element, animationClass: string): void {
    const el = element instanceof ElementRef ? element.nativeElement : element;

    if (!el) return;

    this.renderer.removeClass(el, animationClass);
  }

  /**
   * Animate with custom delay
   */
  animateWithDelay(element: ElementRef | Element, animationClass: string, delay: number): void {
    const el = element instanceof ElementRef ? element.nativeElement : element;

    if (!el) return;

    setTimeout(() => {
      this.renderer.addClass(el, animationClass);
    }, delay);
  }

  /**
   * Animate staggered elements
   */
  animateStaggered(
    elements: (ElementRef | Element)[],
    animationClass: string,
    staggerDelay: number = 100,
  ): void {
    elements.forEach((element, index) => {
      this.animateWithDelay(element, animationClass, index * staggerDelay);
    });
  }

  /**
   * Check if element is in viewport
   */
  isElementInViewport(element: ElementRef | Element): boolean {
    const el = element instanceof ElementRef ? element.nativeElement : element;

    if (!el) return false;

    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Cleanup observer
   */
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.animatedElements.clear();
  }

  /**
   * Reset animations for element
   */
  resetAnimation(element: ElementRef | Element): void {
    const el = element instanceof ElementRef ? element.nativeElement : element;

    if (!el) return;

    // Remove all animation classes
    const animationClasses = [
      'animate-in',
      'animate-on-scroll',
      'animate-grid-item',
      'animate-card',
      'animate-text-reveal',
      'animate-image-reveal',
      'animate-button',
      'animate-form-field',
      'animate-nav-item',
      'animate-hero-content',
      'animate-hero-image',
      'animate-section',
      'animate-list-item',
      'animate-modal',
      'animate-loading',
    ];

    animationClasses.forEach((className) => {
      this.renderer.removeClass(el, className);
    });

    // Remove from animated elements set
    this.animatedElements.delete(el);
  }

  /**
   * Animate entire page layout
   */
  animatePageLayout(container: ElementRef | Element, retryCount: number = 0): void {
    const containerEl = container instanceof ElementRef ? container.nativeElement : container;

    if (!containerEl) return;

    // Check if header is loaded before starting animations
    const header = containerEl.querySelector('app-header');
    if (!header && retryCount < 5) {
      console.warn('Header not found, delaying animations, retry:', retryCount);
      setTimeout(() => this.animatePageLayout(container, retryCount + 1), 200);
      return;
    } else if (!header) {
      console.warn('Header not found after 5 retries, proceeding without header check');
    }

    // Animate different sections with appropriate delays
    setTimeout(() => {
      this.animateHeroSection(containerEl);
    }, 100);

    setTimeout(() => {
      this.animateSections(containerEl);
    }, 300);

    setTimeout(() => {
      this.animateCards(containerEl);
    }, 500);

    setTimeout(() => {
      this.animateTextElements(containerEl);
    }, 700);

    setTimeout(() => {
      this.animateImages(containerEl);
    }, 900);

    setTimeout(() => {
      this.animateButtons(containerEl);
    }, 1100);
  }
}
