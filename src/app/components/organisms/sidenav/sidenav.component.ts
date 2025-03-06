import { Component, inject, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstAppEvents, ConstNavigableModifiers, ConstModifiers } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { DataService, EventService, FractalService } from '@services';
import { IFractal } from '@types';
import { NewFractal } from 'app/utils/fractals/new-fractal';

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

  onPageTouched(page: IFractal): void {
    this.collections.selectedChild.set(page);
    this.fs.navigatePage(page.cursor);
  }

  onModifierHeld = (modifier: IFractal): void => {
    const selectedChild = this.collections.selectedChild.$value();
    if (!selectedChild) return;

    const handler: Record<string, () => void> = {
      [Save]: () => {
        const controls = selectedChild.updateSelectedChildren();
        controls.length > 0 && this.ds.updateControls(controls).subscribe();

        const newFractalsDto = selectedChild.addChildren();
        newFractalsDto.length > 0 && this.ds.add(newFractalsDto).subscribe();

        selectedChild.newChildren.clear();
      },
      [Delete]: () => {
        const selectedChildren = selectedChild.selectedChildren.$value();
        selectedChildren.length > 0 && this.ds.delete(selectedChildren.map(({ dto }) => dto)).subscribe();
        this.collections.selectedChild.$value()?.deleteSelectedChildren();
        selectedChild.newChildren.clear();
        selectedChild.selectedChildren.clear();
      },
    };

    handler[modifier.cursor]?.();
    this.collections.selectedChild.refresh();
    this.fs.navigateModifier(null);
  };

  onModifierTouched(modifier: IFractal): void {
    const selectedChild = this.collections.selectedChild.$value();
    if (!selectedChild) return;
    const { newChildren, selectedChildren } = selectedChild;

    const handler: Record<string, () => void> = {
      [New]: () => {
        selectedChild.newChildren.push(NewFractal(selectedChild, { syncFormWithDto: true }));
      },
      [Edit]: () => {},
      [Save]: () => {},
    };

    handler[modifier.cursor]?.();
    if (modifier.is(ConstNavigableModifiers) && (selectedChildren.$value().length || newChildren.$value().length)) {
      this.fs.navigateModifier(ConstNavigableModifiers.Edit);
    }
  }
}
