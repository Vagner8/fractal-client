import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, StatesService } from '@services';
import { NavigationEnd, Router } from '@angular/router';
import { FractalFactory, getSegments, isNavigationEnd } from '@utils';
import { APP_EVENTS, APP_FRACTALS } from '@constants';
import { filter } from 'rxjs';
import { appTestData } from './app-test-data';

@Component({
  selector: 'app-root',
  imports: [SidenavComponent, ToolbarComponent, SpinnerComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ds = inject(DataService);
  ss = inject(StatesService);

  router = inject(Router);

  ngOnInit(): void {
    this.router.events.pipe(filter(isNavigationEnd)).subscribe(this.navigationEnd);

    // this.ds.getFractalWithChildrenRecursively(APP_FRACTALS.APP).subscribe(() => {
    //   const app = new FractalFactory(appTestData);
    //   this.ss.$app.set(app);

    //   console.info('🚀 ~ app:', app);

    //   this.ss.pages = app.findChildRecursively('Pages');
    //   this.ss.manager = app.findChildRecursively('Manager');
    //   this.ss.modifiers = app.findChildRecursively('Modifiers');
    //   this.ss.collections = app.findChildRecursively('Collections');

    //   this.init();
    // });

    const app = new FractalFactory(appTestData);
    this.ss.$app.set(app);

    console.info('🚀 ~ app:', app);

    this.ss.pages = app.findChildRecursively('Pages');
    this.ss.manager = app.findChildRecursively('Manager');
    this.ss.modifiers = app.findChildRecursively('Modifiers');
    this.ss.collections = app.findChildRecursively('Collections');

    this.init();
  }

  init(): void {
    const collectionParam = this.ss.$collectionParam();
    this.ss.$sidenavTaps.set(this.ss.collections);
    this.ss.$managerEvent.set(this.ss.$queryParams().Manager ?? APP_EVENTS.HOLD);
    this.ss.collections &&
      collectionParam &&
      this.ss.selectedCollection.set(this.ss.collections.findChild([collectionParam]));
  }

  navigationEnd = (event: NavigationEnd): void => {
    const { queryParams, editorParam, collectionParam } = getSegments(event);

    this.ss.$queryParams.set(queryParams);
    this.ss.$editorParam.set(editorParam);
    this.ss.$collectionParam.set(collectionParam);
  };
}
