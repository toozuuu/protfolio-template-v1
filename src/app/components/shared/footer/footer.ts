import { Component} from '@angular/core';
import { SocialButtons } from "../../social-buttons/social-buttons";

@Component({
  selector: 'app-footer',
  imports: [SocialButtons],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
