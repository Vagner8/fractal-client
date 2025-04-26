import { Routes } from '@angular/router';
import { ScreenComponent } from '@components/organisms';
import { CAppPages, CAppParams } from '@constants';

export const routes: Routes = [
  {
    path: `:${CAppParams.Page}`,
    component: ScreenComponent,
  },
  { path: '**', redirectTo: CAppPages.Home },
];
