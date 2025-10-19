import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GDPRBannerComponent } from './components/gdpr-banner/gdpr-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GDPRBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Protfolio • Sachin Dilshan');
}
