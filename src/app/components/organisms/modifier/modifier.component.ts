import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { DataService, ModifiersService, SelectService } from '@services';
import { ConstModifiers } from '@constants';
import { ListComponent } from '@components/atoms';
import { FractalControlsFormsComponent } from '@components/molecules';
import { BaseComponent } from '@utils';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FractalControlsFormsComponent, ListComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
})
export class ModifierComponent extends BaseComponent implements OnInit, OnDestroy {
  ss = inject(SelectService);
  private ds = inject(DataService);
  private ms = inject(ModifiersService);

  ngOnInit(): void {
    console.log(this.ss.$selectedFractals.signal());
    this.pushSub(this.ms.hold$.subscribe(modifier => modifier && this.onModifierHeld(modifier)));
  }

  ngOnDestroy(): void {
    this.clearSubs();
  }

  private onModifierHeld(cursor: string): void {
    const { $selectedFractals } = this.ss;
    const { Save } = ConstModifiers.record;
    ({
      [Save]: (): void => {
        if (!$selectedFractals.isEmpty) {
          this.ds.update($selectedFractals.updateFractalsByForm()).subscribe();
        }
      },
    })[cursor]?.();
  }
}
