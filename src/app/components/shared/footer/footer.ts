import { Component, ChangeDetectionStrategy} from '@angular/core';
import { SocialButtons } from "../../social-buttons/social-buttons";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [SocialButtons, TranslateModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
