import { Component, Input } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { IFractal } from '@types';

@Component({
  selector: 'app-fractal-collection',
  standalone: true,
  imports: [MatTableModule, TapDirective],
  templateUrl: './fractal-collection.component.html',
  styleUrl: './fractal-collection.component.scss',
})
export class FractalCollectionComponent {
  @Input() fractal!: IFractal;

  get columns(): string[] {
    return this.fractal.order('Order children controls');
  }

  get dataSource(): string[] {
    return this.fractal.order('Order children');
  }
}
