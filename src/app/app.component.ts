import { Component, inject, OnInit } from '@angular/core';
import { Sidenav } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, FractalService, StatesService } from '@services';
import { NavigationEnd, Router } from '@angular/router';
import { FractalFactory, getSegments, isNavigationEnd } from '@utils';
import { filter } from 'rxjs';
import { appData } from './data/appData';
import { APP_FRACTALS } from '@constants';

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

    this.ds.getFractalWithChildrenRecursively(APP_FRACTALS.APP).subscribe((appDto) => {
      const app = new FractalFactory(appDto);
      this.fs.$app.set(app);
      console.info('🚀 ~ app:', app);
    });
  }

  navigationEnd = (event: NavigationEnd): void => {
    const { queryParams, editorParam, collectionParam } = getSegments(event);

    this.ss.$queryParams.set(queryParams);
    this.ss.$editorParam.set(editorParam);
    this.ss.$collectionParam.set(collectionParam);
  };
}
