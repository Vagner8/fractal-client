import { Component, inject, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstAppEvents, ConstNavigableModifiers, ConstModifiers, ConstAppFractals } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { DataService, EventService, FractalService, StatesService } from '@services';
import { IFractal } from '@types';
import { Fractal } from '@utils';
import { FractalDto } from 'app/utils/fractal/dto/fractal-dto';

const { New, Edit, Save, Delete } = ConstModifiers;

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Input() modifiers!: IFractal;
  @Input() collections!: IFractal;
  es = inject(EventService);
  ss = inject(StatesService);
  fs = inject(FractalService);
  private ds = inject(DataService);

  AppEvents = ConstAppEvents;
  AppFractals = ConstAppFractals;

  onPageTouched(page: IFractal): void {
    this.ss.currentFractal.set(page);
    this.ss.selectedChildren.clear();
    this.fs.navigatePage(page.cursor);
  }

  onModifierHeld = (modifier: IFractal): void => {
    const current = this.ss.currentFractal.$value();
    if (!current) return;

    const handler: Record<string, () => void> = {
      [Save]: () => {
        const controls = current.updateSelectedChildren();
        controls.length > 0 && this.ds.updateControls(controls).subscribe();

        const newFractals = current.addNewChildren();
        newFractals.length > 0 && this.ds.add(newFractals).subscribe();
      },

      [Delete]: () => {
        const deleteChildren = current.deleteSelectedChildren();
        deleteChildren.length > 0 && this.ds.delete(deleteChildren).subscribe();
      },
    };

    handler[modifier.cursor]?.();
    this.afterModifierHeld(current);
  };

  private afterModifierHeld(current: IFractal): void {
    this.ss.newChildren.clear();
    this.ss.selectedChildren.clear();
    const oc = current.controls.getKnown('Oc')?.dto;
    oc && this.ds.updateControls([oc]).subscribe();
    this.ss.currentFractal.refresh();
    this.fs.navigateModifier(null);
  }

  onModifierTouched(modifier: IFractal): void {
    const current = this.ss.currentFractal.$value();
    if (!current) return;

    const handler: Record<string, () => void> = {
      [New]: () => {
        this.ss.newChildren.push(new Fractal(new FractalDto(current), current, { syncFormWithDto: true }));
      },
      [Edit]: () => {},
      [Save]: () => {},
    };

    handler[modifier.cursor]?.();
    this.afterModifierTouched(modifier);
  }

  private afterModifierTouched({ cursor }: IFractal): void {
    if (
      Object.prototype.hasOwnProperty.call(ConstNavigableModifiers, cursor) &&
      (!this.ss.selectedChildren.isEmpty || !this.ss.newChildren.isEmpty || !this.ss.currentFractal.isEmpty)
    ) {
      this.fs.navigateModifier(ConstNavigableModifiers.Edit);
    }
  }
}
