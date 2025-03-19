import { Component, inject, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstAppEvents, ConstNavigableModifiers, ConstModifiers, ConstAppFractals } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { DataService, EventService, FractalService, StatesService } from '@services';
import { IFractal } from '@types';
import { addFractals, deleteFractals, Fractal, updateFractals } from '@utils';
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
    this.ss.clearAll();
    this.ss.currentFractal.set(page);
    this.fs.navigatePage(page.cursor);
  }

  onModifierHeld = (modifier: IFractal): void => {
    const currentFractal = this.ss.currentFractal.$value();
    if (!currentFractal) return;

    const handler: Record<string, () => void> = {
      [Edit]: () => {
        this.ss.selectedChildrenForms.$value().forEach(fractal => fractal.$fullEditMode.update(prev => !prev));
      },

      [Save]: () => {
        this.updateFractals(currentFractal);
        this.addFractals(currentFractal);
      },

      [Delete]: () => {
        if (this.ss.$paramMap()?.get(ConstAppFractals.Modifiers)) {
          this.deleteSelectedChildrenForms(currentFractal);
        } else {
          this.deleteSelectedChildren(currentFractal);
        }
      },
    };

    handler[modifier.cursor]?.();
  };

  onModifierTouched(modifier: IFractal): void {
    const currentFractal = this.ss.currentFractal.$value();
    if (!currentFractal) return;

    const handler: Record<string, () => void> = {
      [New]: () => {
        this.ss.newChildren.push(
          new Fractal(new FractalDto(currentFractal), currentFractal, { syncFormWithDto: true })
        );
        this.afterModifierTouched(modifier);
      },
      [Edit]: () => {
        this.afterModifierTouched(modifier);
      },
      [Delete]: () => {
        const selectedChildrenForms = this.ss.selectedChildrenForms.$value();
        if (selectedChildrenForms.length > 0) {
          this.ss.selectedChildrenForms.clear();
          this.ss.newChildren.deleteBunch(selectedChildrenForms);
          this.ss.selectedChildren.deleteBunch(selectedChildrenForms);
        }
      },
    };

    handler[modifier.cursor]?.();
  }

  private updateFractals(currentFractal: IFractal): void {
    const controlsToUpdate = [...updateFractals([currentFractal, ...this.ss.selectedChildren.$value()])];
    controlsToUpdate.length > 0 && this.ds.updateControls(controlsToUpdate).subscribe();
  }

  private addFractals(currentFractal: IFractal): void {
    const newChildren = this.ss.newChildren.$value();
    if (newChildren.length > 0) {
      this.ss.newChildren.clear();
      this.ss.selectedChildren.pushBunch(newChildren);
      const { fractalsToAdd, orderChildren } = addFractals(currentFractal, newChildren);
      this.ds.addFractals(fractalsToAdd).subscribe();
      orderChildren && this.ds.updateControls([orderChildren]).subscribe();
    }
  }

  private deleteFractals(currentFractal: IFractal, fractals: IFractal[]): void {
    const { fractalsToDelete, orderChildren } = deleteFractals(currentFractal, fractals);
    this.ds.deleteFractals(fractalsToDelete).subscribe();
    orderChildren && this.ds.updateControls([orderChildren]).subscribe();
  }

  private deleteSelectedChildrenForms(currentFractal: IFractal): void {
    const selectedChildrenForms = this.ss.selectedChildrenForms.$value();
    if (selectedChildrenForms.length > 0) {
      this.ss.newChildren.deleteBunch(selectedChildrenForms);
      this.ss.selectedChildren.deleteBunch(selectedChildrenForms);
      this.deleteFractals(currentFractal, selectedChildrenForms);
    }
  }

  private deleteSelectedChildren(currentFractal: IFractal): void {
    const selectedChildren = this.ss.selectedChildren.$value();
    if (selectedChildren.length > 0) {
      this.ss.selectedChildren.clear();
      this.ss.currentFractal.refresh();
      this.deleteFractals(currentFractal, selectedChildren);
    }
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
