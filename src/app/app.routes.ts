import { Routes } from '@angular/router';
import { ScreenComponent } from '@components/organisms';
import { AppEntities } from '@constants';

export const routes: Routes = [
  {
    path: `:${AppEntities.Pages}`,
    component: ScreenComponent,
  },
  { path: '**', redirectTo: 'Home' },
];
