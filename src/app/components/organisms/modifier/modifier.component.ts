import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { DataService, ModifiersService, NewControlService, SelectService } from '@services';
import { Subscription } from 'rxjs';
import { EditModifierComponent } from './edit-modifier/edit-modifier.component';
import { AppModifiers } from '@utils';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, EditModifierComponent],
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
        const toAdd = this.ss.$new();
        const toUpdate = this.ss.$items();
        ({
          [AppModifiers.Save]: (): void => {
            if (toAdd.length > 0) {
              this.ds.add(toAdd.map(fractal => fractal.updateFractalByForm())).subscribe();
            }
            if (toUpdate.length > 0) {
              const filtered = toUpdate.filter(({ form }) => form.enabled && form.dirty);
              filtered.length > 0 && this.ds.update(filtered.map(fractal => fractal.updateFractalByForm())).subscribe();
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
