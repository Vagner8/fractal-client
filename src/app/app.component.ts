import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, StatesService } from '@services';
import { appMock } from '@tests';
import { Router } from '@angular/router';
import { FractalFactory, isNavigationEnd } from '@utils';
import { ConstantsValues, Fractal } from '@types';
import { APP_FRACTALS } from '@constants';
import { filter, take } from 'rxjs';

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
    const app = new FractalFactory({} as Fractal, appMock);
    console.log('🚀 ~ app:', app);

    [this.ss.manager, this.ss.modifiers, this.ss.collections] = (
      ['Manager', 'Modifiers', 'Collections'] satisfies ConstantsValues<typeof APP_FRACTALS>[]
    ).map(app.getChildRecursively);
    this.ss.$app.set(app);

    this.router.events.pipe(filter(isNavigationEnd), take(1)).subscribe(this.ss.init);
    this.router.events.pipe(filter(isNavigationEnd)).subscribe(this.ss.navigationEnd);
  }
}
