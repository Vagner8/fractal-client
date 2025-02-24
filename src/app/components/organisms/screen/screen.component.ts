import { ChangeDetectionStrategy, Component, computed, inject, Input, OnInit } from '@angular/core';
import { FractalService } from '@services';
import { EditorComponent } from '../editor/editor.component';
import { ApplicationComponent } from '../application/application.component';
import { ConstEntities, ConstPages } from '@constants';
import { AppParams } from '@types';
import { ChildrenControlsComponent } from '@components/molecules';
import { CollectionFractal, isCollection } from '@utils';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [ApplicationComponent, EditorComponent, ChildrenControlsComponent],
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
  @Input() Collections = '';

  fs = inject(FractalService);

  currentPage = computed(() => {
    let page: CollectionFractal | null = null;
    for (const fractal of this.fs.collections?.fractals.values || []) {
      page = fractal.$selected() && isCollection(fractal) ? fractal : null;
      if (page) return page;
    }
    return null;
  });

  ConstPages = ConstPages;

  ngOnInit(): void {
    const app = this.fs.$app();
    if (!app) return;
    const { Modifiers, Collections } = ConstEntities;
    this.fs.modifiers?.$selected.set(this.Taps === Modifiers);
    this.fs.collections?.$selected.set(!this.Taps || this.Taps === Collections);
  }
}
