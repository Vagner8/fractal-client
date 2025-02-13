import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { SelectService, EntitiesService, TapsService } from '@services';
import { ModifierComponent } from '../modifier/modifier.component';
import { ApplicationComponent } from '../application/application.component';
import { TableComponent } from '@components/atoms';
import { ConstPages, ConstParams } from '@constants';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [ApplicationComponent, ModifierComponent, TableComponent],
  templateUrl: './screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenComponent implements OnInit {
  @Input() Taps = '';
  @Input() Pages = '';
  @Input() Manager = '';
  @Input() EditMode = '';
  @Input() Modifiers = '';

  ts = inject(TapsService);
  ss = inject(SelectService);
  ent = inject(EntitiesService);

  appPages = ConstPages;

  ngOnInit(): void {
    const app = this.ent.$app();
    if (!app) return;
    ConstParams;
  }
}
