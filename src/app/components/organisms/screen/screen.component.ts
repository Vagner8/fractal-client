import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { AppEvents, AppEntities } from '@types';
import { ManagerService, ModifiersService, TapsService, SelectService, EntitiesService } from '@services';
import { ModifierComponent } from '../modifier/modifier.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { TableComponent } from '@components/atoms';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [ControlPanelComponent, ModifierComponent, TableComponent],
  templateUrl: './screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenComponent implements OnInit {
  ts = inject(TapsService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);
  ent = inject(EntitiesService);

  @Input() Taps = '';
  @Input() Rows = '';
  @Input() Pages = '';
  @Input() Manager = '';
  @Input() Modifiers = '';

  ngOnInit(): void {
    this.init();
  }

  private openSidenav(): void {
    if (this.mgr.$event() !== AppEvents.Touch) {
      this.mgr.set(AppEvents.Touch);
    }
    if (this.ts.$taps()?.is(AppEntities.Pages)) {
      // this.ts.set(this.ms.parent);
    }
  }

  private init(): void {
    // const { Taps, Pages, Manager, AppModifiers } = this;
    // const root = this.ent.$root()!;
    // this.ss.init({ root, Pages });
    // this.ms.init({ root, AppModifiers });
    // this.ts.init({
    //   Taps,
    //   pages: this.ent.pages,
    //   modifiers: this.ent.modifiers,
    // });
    // this.mgr.init({ Manager });
    // [AppModifiers.Delete, AppModifiers.Save].some(modifier => modifier === Modifier)
    // && this.cs.current.formArray.disable();
  }
}
