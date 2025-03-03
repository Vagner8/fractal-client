import { Component, inject, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstAppEvents, ConstNavigableModifiers, ConstModifiers } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { DataService, EventService, FractalService } from '@services';
import { Fractal } from '@types';

const { New, Edit, Save, Delete } = ConstModifiers;

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

  AppEvents = ConstAppEvents;

  onPageTouched(page: Fractal): void {
    this.collections.selectedChild.set(page);
    this.fs.navigatePage(page.controls.getDataOf('Cursor'));
  }

  onModifierHeld = (modifier: Fractal): void => {
    const selectedChild = this.collections.selectedChild.$value();
    if (!selectedChild) return;

    const handler: Record<string, () => void> = {
      [Save]: () => {
        const controls = selectedChild.updateChildrenControls();
        controls.length > 0 && this.ds.updateControls(controls).subscribe();

        const newFractalsDto = selectedChild.addChildren();
        newFractalsDto.length > 0 && this.ds.add(newFractalsDto).subscribe();

        selectedChild.newChildren.clear();
      },
      [Delete]: () => {
        const selectedChildren = selectedChild.selectedChildren.$value();
        selectedChildren.length > 0 && this.ds.delete(selectedChildren.map(({ dto }) => dto)).subscribe();
        this.collections.selectedChild.$value()?.deleteChildren();
        selectedChild.newChildren.clear();
        selectedChild.selectedChildren.clear();
      },
    };

    handler[modifier.controls.getDataOf('Cursor')]?.();
    this.collections.selectedChild.refresh();
    this.fs.navigateModifier(null);
  };

  onModifierTouched(modifier: Fractal): void {
    const selectedChild = this.collections.selectedChild.$value();
    if (!selectedChild) return;
    const { newChildren, selectedChildren } = selectedChild;

    const handler: Record<string, () => void> = {
      [New]: () => {
        selectedChild.addNewChild();
      },
      [Edit]: () => {},
      [Save]: () => {},
    };

    handler[modifier.controls.getDataOf('Cursor')]?.();
    if (modifier.is(ConstNavigableModifiers) && (selectedChildren.$value().length || newChildren.$value().length)) {
      this.fs.navigateModifier(ConstNavigableModifiers.Edit);
    }
  }
}
