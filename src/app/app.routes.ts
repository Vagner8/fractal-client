import { Routes } from '@angular/router';
import { ScreenComponent } from '@components/organisms';
import { ConstEntities } from '@constants';

export const routes: Routes = [
  {
    path: `:${ConstEntities.Pages}`,
    component: ScreenComponent,
  },
  { path: '**', redirectTo: 'Home' },
];
