import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstAppEvents, ConstNavigableModifiers, ConstAppParams } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { EventService } from '@services';
import { Fractal, FractalCollection } from '@types';
import { isCollection } from '@utils';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Input() modifiers!: FractalCollection;
  @Input() collections!: FractalCollection;
  es = inject(EventService);
  router = inject(Router);

  AppEvents = ConstAppEvents;

  onPageTouched(page: Fractal): void {
    isCollection(page.parent) && page.parent.unselectAllChildren();
    page.$selected.set(true);
    this.router.navigate([page.controls.get('Cursor')?.dto?.data]);
  }

  onModifierTouched(modifier: Fractal): void {
    modifier.parent.unselectAllChildren();
    modifier.$selected.set(true);
    modifier.parent.touchedChildren$.next(modifier);
    if (modifier.is(ConstNavigableModifiers)) {
      this.router.navigate([], {
        queryParams: { [ConstAppParams.Modifiers]: ConstNavigableModifiers.Edit },
        queryParamsHandling: 'merge',
      });
    }
  }
}
