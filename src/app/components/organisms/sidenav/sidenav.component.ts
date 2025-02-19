import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstSort, ConstEntities, ConstEvents } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { SelectService, EntitiesService, ModifiersService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  ens = inject(EntitiesService);

  events = ConstEvents;
  entities = ConstEntities;
  splitIndicators = ConstSort;

  onPageTouched(tap: Fractal): void {
    this.ss.currentFractal.setAndNavigate(tap);
  }
}
