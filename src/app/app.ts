import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import {
  RouterOutlet,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoadingService } from './core/loading.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('Protfolio • Sachin Dilshan');
  private routerSubscription?: Subscription;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loadingService.startLoading('Loading page...');
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.loadingService.completeLoading();
        }
      });
    this.simulateInitialLoading();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private async simulateInitialLoading() {
    this.loadingService.showFullScreenLoading('Loading application...');
    const loadingSteps = [
      { message: 'Initializing application...', duration: 1000 },
      { message: 'Loading components...', duration: 1000 },
      { message: 'Preparing interface...', duration: 1000 },
    ];

    await this.loadingService.simulateLoading(loadingSteps);
  }
}
