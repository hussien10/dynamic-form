import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/form-creator/form-creator').then(m => m.FormCreator) },
];
