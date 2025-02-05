import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { FractalFactory } from '@fractal';
import { MatListModule, MatSidenavModule } from '@mat';
import { ManagerService, ModifiersService, TapsService, SelectService, DataService } from '@services';
import { AppEntities, Fractal, AppModifiers, SplitIndicators } from '@types';
import { BaseService } from 'app/services/base.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  bs = inject(BaseService);
  ds = inject(DataService);
  ts = inject(TapsService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  appEntities = AppEntities;
  splitIndicators = SplitIndicators;

  modifierHeld(modifier: Fractal): void {
    this.ms.hold(modifier);
    const toUpdate = this.ss.$items();
    switch (modifier.cursor) {
      case AppModifiers.Delete:
        if (toUpdate.length > 0) {
          this.ds.delete(toUpdate.map(({ dto }) => dto)).subscribe();
        }
        break;
    }
  }

  modifierTouched(modifier: Fractal): void {
    switch (true) {
      case modifier.is(AppModifiers.New):
        this.ss.setNew(new FractalFactory({ parent: this.ss.$current() }));
        this.ms.touch(modifier);
        break;
      case (modifier.is(AppModifiers.Edit), modifier.is(AppModifiers.Edit)):
        if (this.ss.areItems || this.ss.isCurrent) this.ms.touch(modifier);
        break;
    }
  }

  async pageTouched(tap: Fractal): Promise<void> {
    this.ss.clear();
    this.ss.setCurrent(tap);
    await this.bs.navigate({}, [tap.cursor]);
    this.ms.touch(null);
  }
}
