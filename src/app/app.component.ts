import { Component, inject, OnInit } from '@angular/core';
import { Sidenav } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, FractalService, StatesService } from '@services';
import { NavigationEnd, Router } from '@angular/router';
import { FractalFactory, getSegments, isNavigationEnd } from '@utils';
import { filter } from 'rxjs';
import { appData } from './data/appData';

@Component({
  selector: 'app-root',
  imports: [Sidenav, ToolbarComponent, SpinnerComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ds = inject(DataService);
  ss = inject(StatesService);
  fs = inject(FractalService);

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

    const app = new FractalFactory(appData);
    this.fs.$app.set(app);
    this.fs.selectedFractal.$value.set(app);
    // this.fs.settings = app.findChild('Settings')!;

    console.info('🚀 ~ app:', app);

    // this.ss.settings = app.findChildRecursively('Settings');
    // this.ss.modifiers = app.findChildRecursively('Modifiers');
    // this.ss.collections = app.findChildRecursively('Collections');

    this.init();
  }

  init(): void {
    // this.ss.$managerEvent.set(this.ss.$queryParams().Manager ?? 'hold');
  }

  navigationEnd = (event: NavigationEnd): void => {
    const { queryParams, editorParam, collectionParam } = getSegments(event);

    this.ss.$queryParams.set(queryParams);
    this.ss.$editorParam.set(editorParam);
    this.ss.$collectionParam.set(collectionParam);
  };
}
