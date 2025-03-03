import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { EventService, FractalService } from '@services';
import { EditorComponent } from '../editor/editor.component';
import { ApplicationComponent } from '../application/application.component';
import { ConstAppParams, ConstAppPages } from '@constants';
import { FractalCollectionComponent } from '@components/molecules';

type Params = Record<keyof typeof ConstAppParams, string>;

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [ApplicationComponent, EditorComponent, FractalCollectionComponent],
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

  private es = inject(EventService);
  fs = inject(FractalService);
  AppPages = ConstAppPages;

  ngOnInit(): void {
    this.fs.setSidenavTaps(this.Taps);
    this.es.$managerEvent.set(this.Manager);
    this.fs.collections?.selectedChild.set(this.fs.collections.fractals.get(this.Page));
  }
}
