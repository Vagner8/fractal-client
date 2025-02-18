import { Component, computed, inject, Input, viewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@mat';
import { Fractal } from '@types';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { SelectService } from '@services';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [MatExpansionModule, ExpansionPanelComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
})
export class ApplicationComponent {
  @Input() fractal!: Fractal;
  ss = inject(SelectService);
  accordion = viewChild(MatAccordion);

  closed(): void {
    const current = this.ss.currentFractal.value;
    if (current && !this.fractal.isApp) this.ss.currentFractal.set(current.parent);
    this.accordion()?.closeAll();
  }

  shouldRender = computed(() => {
    let current = this.ss.currentFractal.signal();
    while (current) {
      if (current === this.fractal) return true;
      current = current.parent;
    }
    return false;
  });
}
