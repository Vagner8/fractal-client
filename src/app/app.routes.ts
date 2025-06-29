import { Routes } from '@angular/router';
import { ChildrenComponent, HomeComponent } from '@components/atoms';
import { EditorComponent } from '@components/organisms';
import { APP_PAGES, APP_PARAMS } from '@constants';

export const routes: Routes = [
  {
    path: APP_PAGES.HOME,
    component: HomeComponent,
  },
  {
    path: `:${APP_PARAMS.PAGE}`,
    component: ChildrenComponent,
  },
  {
    path: `:${APP_PARAMS.PAGE}/${APP_PAGES.EDITOR}`,
    component: EditorComponent,
  },
  { path: '**', redirectTo: APP_PAGES.HOME },
];
