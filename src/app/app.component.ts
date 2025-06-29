import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, FractalService, StatesService } from '@services';
import { appMock } from '@tests';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [SidenavComponent, ToolbarComponent, SpinnerComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ds = inject(DataService);
  ss = inject(StatesService);
  fs = inject(FractalService);

  router = inject(Router);

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ss.$params.set(
          event.url
            .split('?')[0]
            .split('/')
            .filter(param => !!param)
        );
      }
    });

    this.fs.init(appMock);
  }
}
