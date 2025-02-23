import { Component, computed, inject, Input, viewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@mat';
import { Fractal } from '@types';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { SelectService } from '@services';
import { ConstCollections, ConstEntities } from '@constants';

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

  Collections = ConstCollections;

  closed(): void {
    const current = this.ss.currentFractal.value;
    if (current && !this.fractal.is(ConstEntities.App)) this.ss.currentFractal.set(current.parent);
    this.accordion()?.closeAll();
  }

  shouldRender = computed(() => {
    let current = this.ss.currentFractal.$value();
    while (current) {
      if (current === this.fractal) return true;
      current = current.parent;
    }
    return false;
  });
}
