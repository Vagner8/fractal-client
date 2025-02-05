import { Component, computed, inject, Input, viewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@mat';
import { Fractal } from '@types';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { SelectService } from '@services';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [MatExpansionModule, ExpansionPanelComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
})
export class ControlPanelComponent {
  ss = inject(SelectService);
  @Input() fractal!: Fractal;
  accordion = viewChild(MatAccordion);

  shouldRender = computed(() => {
    if (this.fractal.isItem) return false;
    let current = this.ss.$current();
    while (current) {
      if (current === this.fractal) return true;
      current = current.parent;
    }
    return false;
  });

  closed(): void {
    this.ss.clear();
    const current = this.ss.$current();
    if (current && !this.fractal.isRoot) this.ss.setCurrent(current.parent);
    this.accordion()?.closeAll();
  }
}
