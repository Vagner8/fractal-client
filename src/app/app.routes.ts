import { Routes } from '@angular/router';
import { ScreenComponent } from '@components/organisms';
import { APP_PAGES, APP_PARAMS } from '@constants';

export const routes: Routes = [
  {
    path: `:${APP_PARAMS.PAGE}`,
    component: ScreenComponent,
  },
  { path: '**', redirectTo: APP_PAGES.HOME },
];
