import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { GDPRBannerComponent } from './components/gdpr-banner/gdpr-banner.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoadingService } from './core/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GDPRBannerComponent, LoadingSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('Protfolio • Sachin Dilshan');
  private routerSubscription?: Subscription;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    // Handle router navigation loading states
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => 
          event instanceof NavigationStart || 
          event instanceof NavigationEnd || 
          event instanceof NavigationCancel || 
          event instanceof NavigationError
        )
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.loadingService.startLoading(this.translateService.instant('ui.loadingPage'));
        } else if (
          event instanceof NavigationEnd || 
          event instanceof NavigationCancel || 
          event instanceof NavigationError
        ) {
          this.loadingService.completeLoading();
        }
      });

    // Simulate initial app loading
    this.simulateInitialLoading();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private async simulateInitialLoading() {
    // Show full-screen loading spinner for 3 seconds
    this.loadingService.showFullScreenLoading(this.translateService.instant('ui.loadingApplication'));
    
    // Simulate loading steps over 3 seconds
    const loadingSteps = [
      { message: this.translateService.instant('ui.initializingApplication'), duration: 1000 },
      { message: this.translateService.instant('ui.loadingComponents'), duration: 1000 },
      { message: this.translateService.instant('ui.preparingInterface'), duration: 1000 }
    ];

    await this.loadingService.simulateLoading(loadingSteps);
  }
}
