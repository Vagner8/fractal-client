import { Component, computed, Input, viewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@mat';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { Fractal } from '@types';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [MatExpansionModule, ExpansionPanelComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
})
export class ApplicationComponent {
  @Input() fractal!: Fractal;
  accordion = viewChild(MatAccordion);

  closed(): void {
    // const current = this.ss.currentFractal.value;
    // if (current && !this.fractal.is(ConstAppFractals.App)) this.ss.currentFractal.set(current.parent);
    // this.accordion()?.closeAll();
  }

  shouldRender = computed(() => {
    // let current = this.ss.currentFractal.$value();
    // while (current) {
    //   if (current === this.fractal) return true;
    //   current = current.parent;
    // }
    return false;
  });
}
