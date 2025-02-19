import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { SelectService, EntitiesService } from '@services';
import { ModifierComponent } from '../modifier/modifier.component';
import { ApplicationComponent } from '../application/application.component';
import { ConstPages } from '@constants';
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
  @Input() Selected = '';
  @Input() EditMode = '';
  @Input() Modifiers = '';

  router = inject(Router);
  ss = inject(SelectService);
  ens = inject(EntitiesService);

  appPages = ConstPages;

  ngOnInit(): void {
    const app = this.ens.$app();
    if (!app) return;
    this.Taps && this.ss.taps.set(app.findFractal(this.Taps));
    this.Pages && this.ss.currentFractal.set(app.findFractal(this.Pages));
    this.Manager && this.ss.manager.set(this.Manager);
    this.Selected && this.ss.selectedFractals.init(this.Selected);
    this.Modifiers && this.ss.modifiers.init(this.Modifiers, this.EditMode);
  }
}
