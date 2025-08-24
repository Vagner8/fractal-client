import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { BreadCrumbs, Card } from '@atoms';
import { FractalService } from '@services';
import { Accordion } from '@templates';
import { Fractal } from '@types';

@Component({
  selector: 'app-dashboard',
  imports: [BreadCrumbs, Card, Accordion, NgTemplateOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  fs = inject(FractalService);
  $tablesView = signal(false);

  onCrumbTouch(fractal: Fractal | null): void {
    this.$tablesView.set(false);
    this.fs.selectedFractal.$value.set(fractal);
    this.fs.selectedControls.clear();
  }

  onTileHoldOrTouch(fractal: Fractal | null, isHold = false): void {
    this.$tablesView.set(isHold);
    this.fs.selectedFractal.$value.set(fractal);
  }
}
