import { Component, inject, Input } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { SelectService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-children-controls',
  standalone: true,
  imports: [MatTableModule, TapDirective],
  templateUrl: './children-controls.component.html',
  styleUrl: './children-controls.component.scss',
})
export class ChildrenControlsComponent {
  @Input() fractal!: Fractal;
  ss = inject(SelectService);
  get columns(): string[] {
    return this.fractal.sortChildrenControls;
  }
}
