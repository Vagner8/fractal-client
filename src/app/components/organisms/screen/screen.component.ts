import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { EventService, FractalService } from '@services';
import { EditorComponent } from '../editor/editor.component';
import { ConstAppParams, ConstAppPages, ConstAppFractals } from '@constants';
import { FractalCollectionComponent } from '@components/molecules';
import { AdminComponent } from '../admin/admin.component';

type Params = Record<keyof typeof ConstAppParams, string>;

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [AdminComponent, EditorComponent, FractalCollectionComponent],
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

  fs = inject(FractalService);
  private es = inject(EventService);

  AppPages = ConstAppPages;

  ngOnInit(): void {
    this.fs.sidenavTaps.set(this.fs.collections);
    this.es.$managerEvent.set(this.Manager);
    const current = this.Page === ConstAppFractals.App ? this.fs.$app() : this.fs.collections?.fractals.get(this.Page);
    current && this.fs.currentFractal.set(current);
  }
}
