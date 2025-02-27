import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, FractalService } from '@services';
import { FractalsFactory, FractalFactory } from '@utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  fs = inject(FractalService);
  private ds = inject(DataService);

  ngOnInit(): void {
    this.ds.get().subscribe(dto => {
      const app = new FractalFactory(dto);
      app.fractals = FractalsFactory(app.dto.fractals, app);
      this.fs.init(app);
    });
  }
}
