import { Routes } from '@angular/router';
import { APP_PAGES } from '@constants';
import { Dashboard } from '@pages';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  { path: '**', redirectTo: APP_PAGES.HOME },
];
