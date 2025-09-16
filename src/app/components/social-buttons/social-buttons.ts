import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-buttons',
  imports: [],
  templateUrl: './social-buttons.html',
  styleUrl: './social-buttons.scss',
})
export class SocialButtons {
  @Input() hideEmail: boolean = false;

  onViewResume() {
    window.open(
      'https://drive.google.com/uc?export=download&id=157tkQVbGHF1cjPO2neXGtc45U-PffBgU',
      '_blank',
      'noopener,noreferrer'
    );
  }
}
