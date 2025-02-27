import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { FractalService } from '@services';
import { EditorComponent } from '../editor/editor.component';
import { ApplicationComponent } from '../application/application.component';
import { ConstAppParams, ConstAppFractals, ConstAppPages } from '@constants';
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

  fs = inject(FractalService);

  AppPages = ConstAppPages;

  ngOnInit(): void {
    const app = this.fs.$app();
    if (!app) return;
    const { Modifiers, Collections } = ConstAppFractals;
    this.fs.modifiers?.$selected.set(this.Taps === Modifiers);
    this.fs.collections?.$selected.set(!this.Taps || this.Taps === Collections);
  }
}
