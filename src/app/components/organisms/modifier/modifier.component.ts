import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { DataService, SelectService } from '@services';
import { ConstModifiers } from '@constants';
import { ListComponent } from '@components/atoms';
import { FractalControlsFormsComponent } from '@components/molecules';
import { BaseComponent, updateFractalsByForm } from '@utils';

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

  ngOnInit(): void {
    this.pushSub(this.ss.modifiers.hold$.subscribe(modifier => modifier && this.onModifierHeld(modifier)));
  }

  ngOnDestroy(): void {
    this.clearSubs();
  }

  private onModifierHeld(cursor: string): void {
    const { selectedFractals } = this.ss;
    const { Save } = ConstModifiers.record;
    ({
      [Save]: (): void => {
        if (!selectedFractals.isEmpty) {
          this.ds.update(updateFractalsByForm(selectedFractals.value)).subscribe();
        }
      },
    })[cursor]?.();
  }
}
