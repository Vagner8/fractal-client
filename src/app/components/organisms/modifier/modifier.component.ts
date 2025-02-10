import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { DataService, ModifiersService, NewControlService, SelectService } from '@services';
import { Subscription } from 'rxjs';
import { AppModifiers } from '@constants';
import { FormCardsComponent } from '@components/molecules';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FormCardsComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
})
export class ModifierComponent implements OnInit, OnDestroy {
  ds = inject(DataService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  ncs = inject(NewControlService);
  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(
      this.ms.hold$.subscribe(modifier => {
        if (!modifier) return;
        const { $selected, $new } = this.ss;
        ({
          [AppModifiers.Save]: (): void => {
            if (!$new.isEmpty) {
              this.ds.add($new.updateFractalsByForm()).subscribe();
            }
            if (!$selected.isEmpty) {
              this.ds.update($selected.updateFractalsByForm()).subscribe();
            }
            if (this.ncs.forms.size > 0) {
              this.ncs.createControls();
            }
          },
        })[modifier.cursor]?.();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
