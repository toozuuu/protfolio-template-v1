import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  // Signal for loading state
  private readonly _isLoading = signal(false);
  private readonly _loadingMessage = signal('Loading...');
  private readonly _loadingProgress = signal(0);
  
  // Computed signals for loading state
  readonly isLoading = this._isLoading.asReadonly();
  readonly loadingMessage = this._loadingMessage.asReadonly();
  readonly loadingProgress = this._loadingProgress.asReadonly();
  
  // Computed signals for loading UI
  readonly showSpinner = computed(() => this._isLoading());
  readonly progressPercentage = computed(() => `${this._loadingProgress()}%`);
  readonly isComplete = computed(() => this._loadingProgress() >= 100);

  // Start loading with optional message
  startLoading(message: string = 'Loading...') {
    this._isLoading.set(true);
    this._loadingMessage.set(message);
    this._loadingProgress.set(0);
  }

  // Update loading progress
  updateProgress(progress: number, message?: string) {
    this._loadingProgress.set(Math.min(100, Math.max(0, progress)));
    if (message) {
      this._loadingMessage.set(message);
    }
  }

  // Complete loading
  completeLoading() {
    this._loadingProgress.set(100);
    setTimeout(() => {
      this._isLoading.set(false);
    }, 500); // Small delay to show completion
  }

  // Stop loading immediately
  stopLoading() {
    this._isLoading.set(false);
    this._loadingProgress.set(0);
  }

  // Simulate loading with steps
  async simulateLoading(steps: Array<{ message: string; duration: number }>) {
    this.startLoading(steps[0]?.message || 'Loading...');
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const progress = ((i + 1) / steps.length) * 100;
      
      this.updateProgress(progress, step.message);
      
      if (i < steps.length - 1) {
        await new Promise(resolve => setTimeout(resolve, step.duration));
      }
    }
    
    this.completeLoading();
  }
}
