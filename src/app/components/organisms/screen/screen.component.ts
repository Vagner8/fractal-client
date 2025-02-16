import { ChangeDetectionStrategy, Component, effect, inject, Input, OnInit } from '@angular/core';
import { SelectService, EntitiesService, TapsService, ManagerService, ModifiersService } from '@services';
import { ModifierComponent } from '../modifier/modifier.component';
import { ApplicationComponent } from '../application/application.component';
import { ConstPages, ConstParams } from '@constants';
import { AppParams } from '@types';
import { Router } from '@angular/router';
import { ChildrenControlsComponent } from '@components/molecules';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [ApplicationComponent, ModifierComponent, ChildrenControlsComponent],
  templateUrl: './screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenComponent implements OnInit, AppParams {
  @Input() Taps = '';
  @Input() Pages = '';
  @Input() Manager = '';
  @Input() EditMode = '';
  @Input() Modifiers = '';

  router = inject(Router);
  ts = inject(TapsService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  mas = inject(ManagerService);
  ens = inject(EntitiesService);

  appPages = ConstPages;

  constructor() {
    effect(() => {
      const current = this.ss.$currentFractal.signal();
      this.router.navigate(current ? [current.cursor] : [], {
        queryParams: {
          [ConstParams.Taps]: this.ts.$taps()?.cursor,
          [ConstParams.Manager]: this.mas.$event(),
          [ConstParams.EditMode]: this.ms.$editMode(),
          [ConstParams.Modifiers]: this.ms.$modifier(),
        },
        queryParamsHandling: 'merge',
      });
    });
  }

  ngOnInit(): void {
    const app = this.ens.$app();
    if (!app) return;
    this.Taps && this.ts.set(app.findFractal(this.Taps));
    this.Pages && this.ss.setCurrentFractals(app.findFractal(this.Pages));
    this.Manager && this.mas.set(this.Manager);
    this.Modifiers && this.ms.set(app.findFractal(this.Modifiers)?.cursor || null);
  }
}
