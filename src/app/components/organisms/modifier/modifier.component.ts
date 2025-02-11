import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { BaseService, DataService, ModifiersService, NewControlService, SelectService } from '@services';
import { Subscription } from 'rxjs';
import { ConstAppModifiers } from '@constants';
import { FormCardsComponent } from '../form-cards/form-cards.component';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FormCardsComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
})
export class ModifierComponent implements OnInit, OnDestroy {
  bs = inject(BaseService);
  ds = inject(DataService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  ncs = inject(NewControlService);
  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(this.ms.hold$.subscribe(modifier => modifier && this.onModifierHeld(modifier.cursor)));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private onModifierHeld(cursor: string): void {
    const { $selected, $new } = this.ss;
    ({
      [ConstAppModifiers.Save]: (): void => {
        if (!$new.isEmpty) {
          this.ds.add($new.updateFractalsByForm()).subscribe();
        }
        if (!$selected.isEmpty) {
          this.ds.update($selected.updateFractalsByForm()).subscribe();
        }
        // if (this.ncs.forms.size > 0) {
        //   this.ncs.createControls();
        // }
      },
    })[cursor]?.();
  }
}
