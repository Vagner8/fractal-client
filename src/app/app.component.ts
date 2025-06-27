import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, FractalService, StatesService } from '@services';
import { appMock } from '@tests';

@Component({
  selector: 'app-root',
  imports: [SidenavComponent, ToolbarComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ds = inject(DataService);
  ss = inject(StatesService);
  fs = inject(FractalService);

  ngOnInit(): void {
    // this.ds.getChildRecursively().subscribe(dto => this.fs.init(dto));

    this.fs.init(appMock);
  }
}
