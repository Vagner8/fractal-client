import { Component, Input } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { CollectionFractal, ItemFractal } from '@utils';

@Component({
  selector: 'app-children-controls',
  standalone: true,
  imports: [MatTableModule, TapDirective],
  templateUrl: './children-controls.component.html',
  styleUrl: './children-controls.component.scss',
})
export class ChildrenControlsComponent {
  @Input() fractal!: CollectionFractal;

  get columns(): string[] {
    return ['Name', 'Email', 'Position'];
  }

  onHold(row: ItemFractal): void {
    const isSomeItemSelected = Array.from(row.parent.fractals.values).some(fractal => fractal.$selected());
    row.parent.fractals.values.forEach(fractal => fractal.$selected.set(isSomeItemSelected));
  }

  onTouch(row: ItemFractal): void {
    row.$selected.update(prev => !prev);
  }
}
