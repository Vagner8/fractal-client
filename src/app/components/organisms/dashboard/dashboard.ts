import { Component, computed, inject, signal } from '@angular/core';
import { Table } from '@components/atoms';
import { TapDirective } from '@directives';
import { MatButtonModule, MatCardModule, MatGridListModule, MatIcon, MatRippleModule } from '@mat';
import { FractalService } from '@services';
import { Fractal, ICollectionState } from '@types';
import { getAncestors } from '@utils';

@Component({
  selector: 'app-dashboard',
  imports: [TapDirective, MatCardModule, MatButtonModule, MatRippleModule, MatGridListModule, MatIcon, Table],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  fs = inject(FractalService);
  $editMode = signal(false);

  $ancestors = computed<Fractal[]>(getAncestors(this.fs.selectedFractal.$value));
  $cols = computed<number>(() => Math.floor(this.$ancestors().length * 5));

  onCardHold(fractal: Fractal): void {
    this.$editMode.set(true);
    this.fs.selectedFractal.$value.set(fractal);
  }

  onCardTouch(fractal: Fractal): void {
    if (!fractal.children) {
      return;
    }
    this.$editMode.set(false);
    this.fs.selectedFractal.$value.set(fractal);
  }

  onChildHold(): void {
    this.onCollectionHold(this.fs.selectedChildren);
  }

  onChildTouch(cursor: string): void {
    this.onCollectionTouch(this.fs.selectedChildren, cursor);
  }

  onControlHold(): void {
    this.onCollectionHold(this.fs.selectedControls);
  }

  onControlTouch(cursor: string): void {
    this.onCollectionTouch(this.fs.selectedControls, cursor);
  }

  onChildrenControlHold(): void {
    this.onCollectionHold(this.fs.selectedChildrenControls);
  }

  onChildrenControlTouch(cursor: string): void {
    this.onCollectionTouch(this.fs.selectedChildrenControls, cursor);
  }

  onCollectionHold(state: ICollectionState): void {
    state.toggleAll();
    this.fs.resetOthers(state);
  }

  onCollectionTouch(state: ICollectionState, cursor: string): void {
    state.toggle(cursor);
    this.fs.resetOthers(state);
  }
}
