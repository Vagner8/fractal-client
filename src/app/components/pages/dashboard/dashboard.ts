import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { BreadCrumbs, Card } from '@atoms';
import { StatesService } from '@services';
import { Accordion } from '@templates';
import { Fractal } from '@types';

@Component({
  selector: 'app-dashboard',
  imports: [BreadCrumbs, Card, Accordion, NgTemplateOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  ss = inject(StatesService);
  $accordionView = signal(false);

  onCrumbTouch(fractal: Fractal | null): void {
    this.$accordionView.set(false);
    this.ss.selectedFractal.$value.set(fractal);
    this.ss.selectedControls.clear();
  }

  onCardTouch(fractal: Fractal | null): void {
    this.$accordionView.set(false);
    this.ss.selectedFractal.$value.set(fractal);
  }

  onCardHoldSave(fractal: Fractal | null): void {
    this.$accordionView.set(true);
    this.ss.selectedFractal.$value.set(fractal);
  }
}
