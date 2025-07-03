import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, StatesService } from '@services';
import { Router } from '@angular/router';
import { FractalFactory, isNavigationEnd } from '@utils';
import { Fractal } from '@types';
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
    this.router.events.pipe(filter(isNavigationEnd)).subscribe(this.ss.navigationEnd);

    this.ds.getFractalWithChildrenRecursively(APP_FRACTALS.APP).subscribe(appDto => {
      const app = new FractalFactory({} as Fractal, appDto);
      this.ss.$app.set(app);

      console.info('🚀 ~ dto:', appDto);
      console.info('🚀 ~ app:', app);

      this.ss.manager = app.findChildRecursively('Manager')!;
      this.ss.modifiers = app.findChildRecursively('Modifiers')!;
      this.ss.collections = app.findChildRecursively('Collections')!;

      this.ss.init();
    });
  }
}
