import { Component, inject, Input, OnInit } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { FractalService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-fractal-collection',
  standalone: true,
  imports: [MatTableModule, TapDirective],
  templateUrl: './fractal-collection.component.html',
  styleUrl: './fractal-collection.component.scss',
})
export class FractalCollectionComponent implements OnInit {
  @Input() fractal!: IFractal;
  fs = inject(FractalService);

  ngOnInit(): void {
    this.fs.currentFractal.$value() === this.fractal;
  }

  get columns(): string[] {
    return this.fractal.controls.getAndSplitControlData('Occ');
  }

  get dataSource(): string[] {
    return this.fractal.controls.getAndSplitControlData('Oc');
  }
}
