import { Component, Input } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { Fractal } from '@types';
import { toggleList, toggleListAll } from '@utils';

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

  onHold(): void {
    this.fractal.$selectedChildren.update(toggleListAll(this.fractal));
  }

  onTouch(row: Fractal): void {
    this.fractal.$selectedChildren.update(toggleList(row));
  }
}
