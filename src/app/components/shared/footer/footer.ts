import { Component} from '@angular/core';
import { SocialButtons } from "../../social-buttons/social-buttons";
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [SocialButtons, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
