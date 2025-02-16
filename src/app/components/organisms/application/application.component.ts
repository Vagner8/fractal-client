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

  shouldRender = computed(() => {
    if (this.fractal.isItem) return false;
    let current = this.ss.$currentPanel.signal();
    while (current) {
      if (current === this.fractal) return true;
      current = current.parent;
    }
    return false;
  });

  closed(): void {
    this.ss.clear('$selectedFractals');
    const current = this.ss.$currentPanel.value;
    if (current && !this.fractal.isApp) this.ss.setCurrentPanel(current.parent);
    this.accordion()?.closeAll();
  }
}
