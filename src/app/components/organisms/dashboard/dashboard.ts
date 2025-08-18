import { Component, inject, signal } from '@angular/core';
import { BreadCrumbs, Tile } from '@components/atoms';
import { Tables } from '@components/molecules';
import { FractalService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-dashboard',
  imports: [Tables, BreadCrumbs, Tile],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  fs = inject(FractalService);
  $showTables = signal(false);

  onTileHold(fractal: Fractal): void {
    this.$showTables.set(true);
    this.fs.selectedFractal.$value.set(fractal);
  }

  onTileTouch(fractal: Fractal | null): void {
    this.$showTables.set(false);
    this.fs.selectedFractal.$value.set(fractal);
  }
}
