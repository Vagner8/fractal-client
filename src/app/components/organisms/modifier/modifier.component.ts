import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { DataService, ModifiersService, SelectService } from '@services';
import { Subscription } from 'rxjs';
import { ConstModifiers } from '@constants';
import { ListComponent } from '@components/atoms';
import { ControlsFormsComponent } from '@components/molecules';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, ControlsFormsComponent, ListComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
})
export class ModifierComponent implements OnInit, OnDestroy {
  ss = inject(SelectService);
  private ds = inject(DataService);
  private ms = inject(ModifiersService);
  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(this.ms.hold$.subscribe(modifier => modifier && this.onModifierHeld(modifier)));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private onModifierHeld(cursor: string): void {
    const { $selected, $new } = this.ss;
    const { Save } = ConstModifiers.record;
    ({
      [Save]: (): void => {
        if (!$new.isEmpty) {
          this.ds.add($new.updateFractalsByForm()).subscribe();
        }
        if (!$selected.isEmpty) {
          this.ds.update($selected.updateFractalsByForm()).subscribe();
        }
      },
    })[cursor]?.();
  }
}
