import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, FractalService } from '@services';

@Component({
  selector: 'app-root',
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  fs = inject(FractalService);
  private readonly ds = inject(DataService);

  ngOnInit(): void {
    this.ds.getFractal().subscribe(dto => this.fs.init(dto));
  }
}
