import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstEvents, ConstNavigationModifiers, ConstParams } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { EventService } from '@services';
import { AbstractFractal, CollectionFractal, isCollection } from '@utils';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Input() modifiers!: CollectionFractal;
  @Input() collections!: CollectionFractal;
  es = inject(EventService);
  router = inject(Router);

  Events = ConstEvents;

  onPageTouched(page: AbstractFractal): void {
    isCollection(page.parent) && page.parent.unselectAllChildren();
    page.$selected.set(true);
    this.router.navigate([page.controls.get('Cursor')]);
  }

  onModifierTouched(modifier: AbstractFractal): void {
    if (modifier.is(ConstNavigationModifiers)) {
      this.router.navigate([], {
        queryParams: { [ConstParams.Modifiers]: ConstNavigationModifiers.Edit },
        queryParamsHandling: 'merge',
      });
    }
  }
}
