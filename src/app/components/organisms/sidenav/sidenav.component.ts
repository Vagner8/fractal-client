import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstAppEvents, ConstNavigableModifiers, ConstAppParams, ConstModifiers } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { DataService, EventService, FractalService } from '@services';
import { Fractal } from '@types';

const { New, Edit, Save } = ConstModifiers;

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Input() modifiers!: Fractal;
  @Input() collections!: Fractal;
  es = inject(EventService);
  private ds = inject(DataService);
  private fs = inject(FractalService);
  private router = inject(Router);

  AppEvents = ConstAppEvents;

  onPageTouched(page: Fractal): void {
    this.collections.$selectedChildren.set([page]);
    this.router.navigate([page.controls.getCursorData]);
  }

  onModifierHeld = (modifier: Fractal): void => {
    const modifierCursor = modifier.controls.getCursorData;
    const handler: Record<string, () => void> = {
      [Save]: () => {
        const selectedCollection = this.fs.collections && this.fs.collections?.$selectedChildren()[0];
        if (!selectedCollection) return;

        const controls = selectedCollection?.updateChildrenControls();
        controls.length > 0 && this.ds.updateControls(controls).subscribe();

        const newFractalsDto = selectedCollection.addChildren();
        newFractalsDto.length > 0 && this.ds.add(newFractalsDto).subscribe();

        this.router.navigate([], {
          queryParams: {
            [ConstAppParams.Modifiers]: null,
          },
          queryParamsHandling: 'merge',
        });
      },
    };
    modifierCursor && handler[modifierCursor]?.();
  };

  onModifierTouched(modifier: Fractal): void {
    const modifierCursor = modifier.controls.getCursorData;
    const handler: Record<string, () => void> = {
      [New]: () => {
        this.fs.collections && this.fs.collections.$selectedChildren()[0].addNewChild();
      },
      [Edit]: () => {},
      [Save]: () => {},
    };
    modifierCursor && handler[modifierCursor]?.();
    if (modifier.is(ConstNavigableModifiers)) {
      this.router.navigate([], {
        queryParams: { [ConstAppParams.Modifiers]: ConstNavigableModifiers.Edit },
        queryParamsHandling: 'merge',
      });
    }
  }
}
