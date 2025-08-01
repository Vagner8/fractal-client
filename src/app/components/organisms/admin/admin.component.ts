import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { StatesService } from '@services';
import { Fractal } from '@types';
import { MatButtonModule, MatIcon } from '@mat';
@Component({
  selector: 'app-admin',
  imports: [MatIcon, MatButtonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  ss = inject(StatesService);

  readonly $ancestors = signal<Fractal[]>([]);

  ngOnInit(): void {
    this.ss.selectedFractal.set(this.ss.$app());
  }

  onFractalSelected(fractal: Fractal): void {
    this.$ancestors.set(this.getAncestors(fractal));
    this.ss.selectedFractal.set(fractal);
  }

  getAncestors(fractal: Fractal): Fractal[] {
    const ancestors: Fractal[] = [];

    let parent = fractal.parent;

    while (parent) {
      ancestors.push(parent);
      parent = parent.parent;
    }

    return ancestors;
  }
}
