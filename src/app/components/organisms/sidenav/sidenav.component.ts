import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { SplitIndicators } from '@constants';
import { FractalFactory } from '@fractal';
import { MatListModule, MatSidenavModule } from '@mat';
import { ManagerService, ModifiersService, TapsService, SelectService, DataService } from '@services';
import { Fractal } from '@types';
import { AppEntities, AppModifiers } from '@utils';
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
    ({
      [AppModifiers.New]: (): void => {
        this.ss.setNew(new FractalFactory({ parent: this.ss.$current() }));
        this.ms.touch(modifier);
      },
      [AppModifiers.Edit]: (): void => {
        if (this.ss.areItems || this.ss.isCurrent) this.ms.touch(modifier);
      },
      [AppModifiers.Delete]: (): void => {
        if (this.ss.areItems || this.ss.isCurrent) this.ms.touch(modifier);
      },
    })[modifier.cursor]?.();
  }

  async pageTouched(tap: Fractal): Promise<void> {
    this.ss.clear();
    this.ss.setCurrent(tap);
    await this.bs.navigate({}, [tap.cursor]);
    this.ms.touch(null);
  }
}
