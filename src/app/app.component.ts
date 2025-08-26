import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '@atoms';
import { Sidenav, Toolbar } from '@molecules';
import { DataService, StatesService } from '@services';
import { Router } from '@angular/router';
import { FractalFactory } from '@utils';
import { APP_FRACTALS } from '@constants';

@Component({
  selector: 'app-root',
  imports: [Sidenav, Toolbar, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ds = inject(DataService);
  ss = inject(StatesService);

  router = inject(Router);

  ngOnInit(): void {
    this.ds.getFractalWithChildrenRecursively(APP_FRACTALS.APP).subscribe((dto) => {
      const app = new FractalFactory(null, dto);
      this.ss.$app.set(app);
      console.info('🚀 ~ app:', app);
    });
  }
}
