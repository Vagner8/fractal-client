import { Component, inject, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstAppEvents, ConstNavigableModifiers, ConstModifiers, ConstAppFractals } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { DataService, EventService, FractalService } from '@services';
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
  fs = inject(FractalService);
  private ds = inject(DataService);

  AppEvents = ConstAppEvents;
  AppFractals = ConstAppFractals;

  onPageTouched(page: IFractal): void {
    this.fs.currentFractal.set(page);
    this.fs.currentFractal.$value()?.selectedChildren.clear();
    this.fs.navigatePage(page.cursor);
  }

  onModifierHeld = (modifier: IFractal): void => {
    const current = this.fs.currentFractal.$value();
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
    current.newChildren.clear();
    current.selectedChildren.clear();
    const oc = current.controls.getKnown('Oc')?.dto;
    oc && this.ds.updateControls([oc]).subscribe();
    this.fs.currentFractal.refresh();
    this.fs.navigateModifier(null);
  }

  onModifierTouched(modifier: IFractal): void {
    const current = this.fs.currentFractal.$value();
    if (!current) return;

    const handler: Record<string, () => void> = {
      [New]: () => {
        current.newChildren.push(new Fractal(new FractalDto(current), current, { syncFormWithDto: true }));
      },
      [Edit]: () => {},
      [Save]: () => {},
    };

    handler[modifier.cursor]?.();
    this.afterModifierTouched(modifier, current);
  }

  private afterModifierTouched({ cursor }: IFractal, { newChildren, selectedChildren }: IFractal): void {
    if (
      Object.prototype.hasOwnProperty.call(ConstNavigableModifiers, cursor) &&
      (!selectedChildren.isEmpty || !newChildren.isEmpty)
    ) {
      this.fs.navigateModifier(ConstNavigableModifiers.Edit);
    }
  }
}
