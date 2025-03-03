import { Component, Input } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { Fractal } from '@types';

@Component({
  selector: 'app-fractal-collection',
  standalone: true,
  imports: [MatTableModule, TapDirective],
  templateUrl: './fractal-collection.component.html',
  styleUrl: './fractal-collection.component.scss',
})
export class FractalCollectionComponent {
  @Input() fractal!: Fractal;

  get columns(): string[] {
    const sortChildrenControls = this.fractal.controls.get('Sort children controls');
    return sortChildrenControls ? sortChildrenControls.getDataAndSplit() : this.fractal.default.sortChildrenControls;
  }
}
