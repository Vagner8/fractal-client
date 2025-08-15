import { Component, computed, inject, signal } from '@angular/core';
import { Table } from '@components/atoms';
import { TapDirective } from '@directives';
import { MatButtonModule, MatCardModule, MatGridListModule, MatIcon, MatRippleModule } from '@mat';
import { FractalService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-dashboard',
  imports: [TapDirective, MatCardModule, MatButtonModule, MatRippleModule, MatGridListModule, MatIcon, Table],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  fs = inject(FractalService);
  $editMode = signal(false);

  $ancestors = computed<Fractal[]>(() => {
    const selectedFractal = this.fs.selectedFractal.$value();
    const ancestors: Fractal[] = [];
    if (selectedFractal) {
      let current: Fractal | undefined | null = selectedFractal.parent;
      while (current) {
        if (current) {
          ancestors.unshift(current);
        }
        current = current?.parent;
      }
    }
    return ancestors;
  });

  $cols = computed<number>(() => Math.floor(this.$ancestors().length * 5));

  onHold(fractal: Fractal): void {
    this.$editMode.set(true);
    this.fs.selectedFractal.set(fractal);
  }

  onTouch(fractal: Fractal): void {
    if (!fractal.children) {
      return;
    }
    this.$editMode.set(false);
    this.fs.selectedFractal.set(fractal);
  }
}
