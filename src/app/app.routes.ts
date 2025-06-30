import { Routes } from '@angular/router';
import { CollectionComponent, HomeComponent } from '@components/atoms';
import { EditorComponent } from '@components/organisms';
import { APP_PAGES, PARAMS } from '@constants';

export const routes: Routes = [
  {
    path: APP_PAGES.HOME,
    component: HomeComponent,
  },
  {
    path: `:${PARAMS.COLLECTION}`,
    component: CollectionComponent,
  },
  {
    path: `:${PARAMS.COLLECTION}/${APP_PAGES.EDITOR}`,
    component: EditorComponent,
  },
  { path: '**', redirectTo: APP_PAGES.HOME },
];
