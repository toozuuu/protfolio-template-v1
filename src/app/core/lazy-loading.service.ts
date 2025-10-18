import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LazyLoadingService {
  private readonly isBrowser: boolean;
  private loadedModules = new Set<string>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Lazy load components only when needed
  async loadComponent(componentName: string): Promise<any> {
    if (!this.isBrowser) return null;
    
    if (this.loadedModules.has(componentName)) {
      return null; // Already loaded
    }

    try {
      let component;
      
      switch (componentName) {
        case 'interactive-skills':
          component = await import('../components/interactive-skills/interactive-skills');
          break;
        case 'analytics':
          component = await import('./analytics.service');
          break;
        case 'animations':
          component = await import('./animations.service');
          break;
        default:
          console.warn(`Unknown component: ${componentName}`);
          return null;
      }

      this.loadedModules.add(componentName);
      return component;
    } catch (error) {
      console.error(`Failed to load component ${componentName}:`, error);
      return null;
    }
  }

  // Preload components that are likely to be needed
  preloadCriticalComponents(): void {
    if (!this.isBrowser) return;

    // Preload components that are likely to be used
    const criticalComponents = ['interactive-skills'];
    
    criticalComponents.forEach(component => {
      this.loadComponent(component);
    });
  }

  // Load components on user interaction
  loadOnInteraction(componentName: string, event: string = 'click'): void {
    if (!this.isBrowser) return;

    const loadComponent = () => {
      this.loadComponent(componentName);
      document.removeEventListener(event, loadComponent);
    };

    document.addEventListener(event, loadComponent, { once: true });
  }

  // Check if component is loaded
  isComponentLoaded(componentName: string): boolean {
    return this.loadedModules.has(componentName);
  }

  // Get loaded modules count
  getLoadedModulesCount(): number {
    return this.loadedModules.size;
  }
}
