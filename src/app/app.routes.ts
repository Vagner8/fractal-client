import { Routes } from '@angular/router';
import { ScreenComponent } from '@components/organisms';
import { ConstAppEntities } from '@constants';

export const routes: Routes = [
  {
    path: `:${ConstAppEntities.Pages}`,
    component: ScreenComponent,
  },
  { path: '**', redirectTo: 'Home' },
];
