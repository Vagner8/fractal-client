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
    this.ss.clearAll();
    this.ss.currentFractal.set(page);
    this.fs.navigatePage(page.cursor);
  }

  onModifierHeld = (modifier: IFractal): void => {
    const currentFractal = this.ss.currentFractal.$value();
    if (!currentFractal) return;

    const handler: Record<string, () => void> = {
      [Edit]: () => {
        this.ss.$fullEditMode.update(prev => !prev);
      },

      [Save]: () => {
        this.updateControls(currentFractal);
        this.addNewFractals(currentFractal);
      },

      [Delete]: () => {
        if (this.ss.$paramMap()?.get(ConstAppFractals.Modifiers)) {
          this.deleteFractalsFromSelectedForms(currentFractal);
        } else {
          this.deleteFractalsFromSelectedChildren(currentFractal);
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
        const selectedForms = this.ss.selectedForms.$value();
        if (selectedForms.length > 0) {
          this.ss.selectedForms.clear();
          this.ss.newChildren.deleteBunch(selectedForms);
          this.ss.selectedChildren.deleteBunch(selectedForms);
        }
      },
    };

    handler[modifier.cursor]?.();
  }

  private updateControls(currentFractal: IFractal): void {
    const controlsToUpdate = [
      ...currentFractal.update(),
      ...currentFractal.updateSelectedChildren(this.ss.selectedChildren.$value()),
    ];
    controlsToUpdate.length > 0 && this.ds.updateControls(controlsToUpdate).subscribe();
  }

  private addNewFractals(currentFractal: IFractal): void {
    const newChildren = this.ss.newChildren.$value();
    if (newChildren.length > 0) {
      this.ss.newChildren.clear();
      this.ss.selectedChildren.pushBunch(newChildren);
      this.ds.add(currentFractal.addNewChildren(newChildren)).subscribe();
      const oc = currentFractal.controls.getKnown('Oc')?.dto;
      oc && this.ds.updateControls([oc]).subscribe();
    }
  }

  private deleteFractals(currentFractal: IFractal, fractalsToDelete: IFractal[]): void {
    this.ds.delete(currentFractal.deleteSelectedChildren(fractalsToDelete)).subscribe();
    const oc = currentFractal.controls.getKnown('Oc');
    oc && this.ds.updateControls([oc.dto]).subscribe();
  }

  private deleteFractalsFromSelectedForms(currentFractal: IFractal): void {
    const selectedForms = this.ss.selectedForms.$value();
    if (selectedForms.length > 0) {
      this.ss.newChildren.deleteBunch(selectedForms);
      this.ss.selectedChildren.deleteBunch(selectedForms);
      this.deleteFractals(currentFractal, selectedForms);
    }
  }

  private deleteFractalsFromSelectedChildren(currentFractal: IFractal): void {
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
