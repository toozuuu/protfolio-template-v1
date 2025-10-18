import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AnimationsService {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Initialize scroll animations
  initializeScrollAnimations(): void {
    if (!this.isBrowser) return;

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
  }

  // Animate counter numbers
  animateCounter(element: HTMLElement, target: number, duration: number = 2000): void {
    if (!this.isBrowser) return;

    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      element.textContent = Math.floor(start).toString();
      
      if (start >= target) {
        element.textContent = target.toString();
        clearInterval(timer);
      }
    }, 16);
  }

  // Typing animation
  typeText(element: HTMLElement, text: string, speed: number = 50): void {
    if (!this.isBrowser) return;

    element.textContent = '';
    let i = 0;
    
    const timer = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      
      if (i >= text.length) {
        clearInterval(timer);
      }
    }, speed);
  }

  // Floating animation for elements
  addFloatingAnimation(element: HTMLElement): void {
    if (!this.isBrowser) return;

    element.style.animation = 'float 3s ease-in-out infinite';
  }

  // Pulse animation for call-to-action elements
  addPulseAnimation(element: HTMLElement): void {
    if (!this.isBrowser) return;

    element.style.animation = 'pulse 2s ease-in-out infinite';
  }

  // Shake animation for errors
  addShakeAnimation(element: HTMLElement): void {
    if (!this.isBrowser) return;

    element.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
  }

  // Bounce animation for success
  addBounceAnimation(element: HTMLElement): void {
    if (!this.isBrowser) return;

    element.style.animation = 'bounce 0.6s ease-in-out';
    
    setTimeout(() => {
      element.style.animation = '';
    }, 600);
  }

  // Slide in animation
  addSlideInAnimation(element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'up'): void {
    if (!this.isBrowser) return;

    const transformMap = {
      left: 'translateX(-100px)',
      right: 'translateX(100px)',
      up: 'translateY(100px)',
      down: 'translateY(-100px)'
    };

    element.style.transform = transformMap[direction];
    element.style.opacity = '0';
    element.style.transition = 'all 0.6s ease-out';

    setTimeout(() => {
      element.style.transform = 'translate(0, 0)';
      element.style.opacity = '1';
    }, 100);
  }

  // Fade in animation
  addFadeInAnimation(element: HTMLElement, delay: number = 0): void {
    if (!this.isBrowser) return;

    element.style.opacity = '0';
    element.style.transition = 'opacity 0.6s ease-out';

    setTimeout(() => {
      element.style.opacity = '1';
    }, delay);
  }

  // Scale animation
  addScaleAnimation(element: HTMLElement, scale: number = 1.1): void {
    if (!this.isBrowser) return;

    element.style.transition = 'transform 0.3s ease-out';
    element.style.transform = `scale(${scale})`;

    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 300);
  }

  // Parallax effect
  addParallaxEffect(element: HTMLElement, speed: number = 0.5): void {
    if (!this.isBrowser) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      element.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
  }

  // Remove parallax effect
  removeParallaxEffect(element: HTMLElement): void {
    if (!this.isBrowser) return;

    element.style.transform = '';
    element.style.transition = '';
  }

  // Stagger animation for multiple elements
  staggerAnimation(elements: HTMLElement[], delay: number = 100): void {
    if (!this.isBrowser) return;

    elements.forEach((element, index) => {
      setTimeout(() => {
        this.addFadeInAnimation(element);
      }, index * delay);
    });
  }

  // Morphing animation between shapes
  morphShape(element: HTMLElement, fromShape: string, toShape: string, duration: number = 1000): void {
    if (!this.isBrowser) return;

    element.style.transition = `all ${duration}ms ease-in-out`;
    element.style.clipPath = fromShape;
    
    setTimeout(() => {
      element.style.clipPath = toShape;
    }, 50);
  }

  // Particle system animation
  createParticleSystem(container: HTMLElement, particleCount: number = 50): void {
    if (!this.isBrowser) return;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = 'rgba(59, 130, 246, 0.6)';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      
      container.appendChild(particle);
    }
  }

  // Clean up animations
  cleanup(): void {
    if (!this.isBrowser) return;

    // Remove all animation event listeners
    window.removeEventListener('scroll', () => {});
  }
}
