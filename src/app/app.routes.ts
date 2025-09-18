import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((c) => c.Home),
  },
  {
    path: 'hire',
    loadComponent: () => import('./pages/hire/hire').then((c) => c.Hire),
  },
];
