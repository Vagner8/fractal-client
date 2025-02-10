import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { DataService, ModifiersService, NewControlService, SelectService } from '@services';
import { Subscription } from 'rxjs';
import { AppModifiers, updateFractalsByForm } from '@utils';
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
        const { $fractals, $newFractals } = this.ss;
        ({
          [AppModifiers.Save]: (): void => {
            if (!$newFractals.isEmpty) {
              this.ds.add(updateFractalsByForm($newFractals.value)).subscribe();
            }
            if (!$fractals.isEmpty) {
              this.ds.update(updateFractalsByForm($fractals.value)).subscribe();
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
