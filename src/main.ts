import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeSv from '@angular/common/locales/sv';

registerLocaleData(localeEn);
registerLocaleData(localeSv);

const MIN_SPLASH_MS = 1200;

const start = performance.now();

bootstrapApplication(App, appConfig)
  .then(async (appRef) => {
    await firstValueFrom(appRef.isStable.pipe(filter(stable => stable)));

    const elapsed = performance.now() - start;
    const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
    await new Promise(res => setTimeout(res, remaining));

    const pre = document.getElementById('preloader');
    if (pre) {
      pre.classList.add('hidden');
      setTimeout(() => pre.remove(), 400);
    }
  })
  .catch(err => console.error(err));
