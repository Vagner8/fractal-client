import { Component, Input } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { Fractal, FractalCollection } from '@types';

@Component({
  selector: 'app-fractal-collection',
  standalone: true,
  imports: [MatTableModule, TapDirective],
  templateUrl: './fractal-collection.component.html',
  styleUrl: './fractal-collection.component.scss',
})
export class FractalCollectionComponent {
  @Input() fractal!: FractalCollection;

  get columns(): string[] {
    const sortChildrenControls = this.fractal.controls.get('Sort children controls');
    return sortChildrenControls ? sortChildrenControls.getDataAndSplit() : this.fractal.default.sortChildrenControls;
  }

  onHold(row: Fractal): void {
    const isSomeItemSelected = row.parent.fractals.values.some(fractal => fractal.$selected());
    row.parent.fractals.values.forEach(fractal => fractal.$selected.set(isSomeItemSelected));
  }

  onTouch(row: Fractal): void {
    row.$selected.update(prev => !prev);
  }
}
