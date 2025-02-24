import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, EntitiesService, FractalService } from '@services';
import { FractalsDto } from '@types';
import { AbstractFractal, CollectionFractal, ItemFractal } from '@utils';
import { RecordFractals } from './utils/record/record-fractals';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  fs = inject(FractalService);
  ens = inject(EntitiesService);
  private ds = inject(DataService);

  ngOnInit(): void {
    this.ds.get().subscribe(dto => {
      const app = new CollectionFractal({ dto });
      app.fractals = this.createFractalsRecursively(app.dto.fractals, app);
      this.fs.init(app);
    });
  }

  createFractalsRecursively(fractalsDto: FractalsDto | null, parent: AbstractFractal): RecordFractals {
    const record = new RecordFractals();
    let fractal: AbstractFractal;
    for (const indicator in fractalsDto) {
      const dto = fractalsDto[indicator];
      fractal = dto.fractals ? new CollectionFractal({ parent, dto }) : new ItemFractal({ parent, dto });
      if (fractal instanceof CollectionFractal) {
        fractal.fractals = this.createFractalsRecursively(fractalsDto[indicator].fractals, fractal);
      }
      record.set(indicator, fractal);
    }
    return record;
  }
}
