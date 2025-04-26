import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { EventService, FractalService, StatesService } from '@services';
import { EditorComponent } from '../editor/editor.component';
import { CAppParams, CAppPages, CAppFractals } from '@constants';
import { AdminComponent } from '../admin/admin.component';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from '@components/atoms';

type Params = Record<keyof typeof CAppParams, string>;

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [AdminComponent, EditorComponent, TableComponent],
  templateUrl: './screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenComponent implements OnInit, Params {
  @Input() Page = '';
  @Input() Taps = '';
  @Input() Manager = '';
  @Input() Selected = '';
  @Input() EditMode = '';
  @Input() Modifiers = '';

  ss = inject(StatesService);
  fs = inject(FractalService);
  private readonly es = inject(EventService);
  private readonly route = inject(ActivatedRoute);

  AppPages = CAppPages;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => this.ss.$paramMap.set(params));
    this.ss.sidenavTaps.set(this.fs.collections);
    this.es.$managerEvent.set(this.Manager);
    const current = this.Page === CAppFractals.App ? this.fs.$app() : this.fs.collections?.fractals.get(this.Page);
    current && this.ss.currentFractal.set(current);
  }
}
