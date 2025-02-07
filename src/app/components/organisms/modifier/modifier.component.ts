import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { AppModifiers, ControlDto } from '@types';
import { MatButtonModule, MatCardModule } from '@mat';
import { DataService, ModifiersService, NewControlService, SelectService } from '@services';
import { Subscription } from 'rxjs';
import { EditModifierComponent } from './edit-modifier/edit-modifier.component';

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

  $toUpdate = computed(() => {
    const items = this.ss.$items();
    const current = this.ss.$current();
    return items.length === 0 && current ? [current] : items;
  });

  ngOnInit(): void {
    this.subs.push(
      this.ms.hold$.subscribe(modifier => {
        const toAdd = this.ss.$new();
        const toUpdate = this.ss.$items();
        switch (modifier?.cursor) {
          case AppModifiers.Save:
            if (toAdd.length > 0) {
              this.ds.add(toAdd.map(fractal => fractal.updateFractalByForm())).subscribe();
            }
            if (toUpdate.length > 0) {
              const filtered = toUpdate.filter(({ form }) => form.enabled && form.dirty);
              filtered.length > 0 && this.ds.update(filtered.map(fractal => fractal.updateFractalByForm())).subscribe();
            }
            if (this.ncs.forms.size > 0) {
              let controlsDto: ControlDto[] = [];
              for (const [fractal, form] of this.ncs.forms.entries()) {
                controlsDto = form.controls.map(control => fractal.addControl(control));
              }
              this.ds.addControls(controlsDto).subscribe();
            }
            break;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
