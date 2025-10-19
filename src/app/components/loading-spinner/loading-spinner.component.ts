import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LoadingService } from '../../core/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  @Input() show: boolean = false;
  @Input() message: string = 'Loading...';
  @Input() progress: number = 0;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'spinner' | 'dots' | 'pulse' | 'progress' = 'spinner';
  @Input() overlay: boolean = true;
  @Input() fullscreen: boolean = true;

  constructor(private loadingService: LoadingService) {}

  // Use computed signals to reactively get loading state
  displayLoading = computed(() => {
    return this.show || this.loadingService.isLoading();
  });

  displayMessage = computed(() => {
    return this.message || this.loadingService.loadingMessage();
  });

  displayProgress = computed(() => {
    return this.progress || this.loadingService.loadingProgress();
  });

  get sizeClasses() {
    switch (this.size) {
      case 'small':
        return 'w-8 h-8';
      case 'large':
        return 'w-20 h-20';
      default:
        return 'w-16 h-16';
    }
  }

  get spinnerClasses() {
    const baseClasses = 'animate-spin border-4 border-blue-600 border-t-transparent rounded-full';
    return `${baseClasses} ${this.sizeClasses}`;
  }

  get overlayClasses() {
    if (this.overlay) {
      return 'fixed inset-0 bg-black bg-opacity-50 dark:bg-slate-900 dark:bg-opacity-80 z-50 backdrop-blur-sm';
    }
    return '';
  }

  get containerClasses() {
    if (this.fullscreen) {
      return 'fixed inset-0 flex items-center justify-center z-50 p-4';
    }
    return 'flex items-center justify-center';
  }
}
