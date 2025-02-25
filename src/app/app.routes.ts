import { Routes } from '@angular/router';
import { ScreenComponent } from '@components/organisms';
import { ConstAppPages, ConstAppParams } from '@constants';

export const routes: Routes = [
  {
    path: `:${ConstAppParams.Page}`,
    component: ScreenComponent,
  },
  { path: '**', redirectTo: ConstAppPages.Home },
];
