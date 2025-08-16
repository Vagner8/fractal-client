import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Tap } from '@components/atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { FractalService, ModifiersService, StatesService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, Tap],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class Sidenav {
  ss = inject(StatesService);
  fs = inject(FractalService);
  ms = inject(ModifiersService);
  route = inject(ActivatedRoute);

  onHold(modifier: Fractal): void {}

  onTouch(modifier: Fractal): void {}
}
