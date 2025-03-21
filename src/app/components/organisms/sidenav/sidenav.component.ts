import { Component, inject, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstAppEvents, ConstNavigableModifiers, ConstModifiers, ConstAppFractals } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { DataService, EventService, FractalService, StatesService } from '@services';
import { IFractal } from '@types';
import { deleteFractals, Fractal, updateFractals } from '@utils';
import { Control } from 'app/utils/fractal/control';
import { ControlDto } from 'app/utils/fractal/dto/control-dto';
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
  private readonly ds = inject(DataService);

  AppEvents = ConstAppEvents;
  AppFractals = ConstAppFractals;

  onPageTouched(page: IFractal): void {
    this.ss.currentFractal.set(page);
    this.ss.markSelectedFractalsPristine();
    this.fs.navigatePage(page.cursor);
  }

  onModifierHeld = (modifier: IFractal): void => {
    const currentFractal = this.ss.currentFractal.$value();
    if (!currentFractal) return;
    const selectedForm = this.ss.selectedForm.$value();
    const selectedChildren = this.ss.selectedChildren.$value();
    const handler: Record<string, () => void> = {
      [Edit]: () => {},

      [Save]: () => {
        selectedChildren.length > 0 && this.updateFractals(currentFractal);
      },

      [Delete]: () => {
        if (this.editPageActivated) {
          selectedForm && this.deleteFractals(currentFractal, [selectedForm]);
        } else {
          selectedChildren.length > 0 && this.deleteFractals(currentFractal, selectedChildren);
        }
      },
    };

    handler[modifier.cursor]?.();
  };

  onModifierTouched(modifier: IFractal): void {
    const currentFractal = this.ss.currentFractal.$value();
    if (!currentFractal) return;
    const selectedForm = this.ss.selectedForm.$value();

    const handler: Record<string, () => void> = {
      [New]: () => {
        if (selectedForm) {
          selectedForm.newControls.push(new Control(new ControlDto(selectedForm.dto.id), { syncFormWithDto: true }));
        } else {
          this.ss.selectedChildren.push(
            new Fractal(new FractalDto(currentFractal), currentFractal, { syncFormWithDto: true })
          );
          this.navigateToEditPage(modifier);
        }
      },
      [Edit]: () => {
        if (!this.editPageActivated) {
          this.navigateToEditPage(modifier);
        } else {
          selectedForm?.fullEditMode.toggle();
        }
      },
      [Delete]: () => {
        if (this.editPageActivated) {
          selectedForm && this.ss.selectedChildren.deleteBunch([selectedForm]);
        }
      },
    };

    handler[modifier.cursor]?.();
  }

  private get editPageActivated(): boolean {
    return !!this.ss.$paramMap()?.get(ConstAppFractals.Modifiers);
  }

  private updateFractals(currentFractal: IFractal): void {
    const { orderChildren, fractalsToAdd, controlsToUpdate } = updateFractals(
      currentFractal,
      this.ss.selectedChildren.$value()
    );
    if (fractalsToAdd.length > 0) {
      this.ds.addFractals(fractalsToAdd).subscribe();
      orderChildren && this.ds.updateControls([orderChildren]).subscribe();
    }
    controlsToUpdate.length > 0 && this.ds.updateControls(controlsToUpdate).subscribe();
  }

  private deleteFractals(currentFractal: IFractal, fractals: IFractal[]): void {
    const { orderChildren, fractalsToDelete, fractalsDtoToDelete } = deleteFractals(currentFractal, fractals);
    this.ss.selectedChildren.deleteBunch(fractalsToDelete);
    fractalsToDelete.length > 0 && this.ds.deleteFractals(fractalsDtoToDelete).subscribe();
    orderChildren && this.ds.updateControls([orderChildren]).subscribe();
  }

  private navigateToEditPage({ cursor }: IFractal): void {
    if (
      Object.hasOwn(ConstNavigableModifiers, cursor) &&
      (!this.ss.selectedChildren.isEmpty || !this.ss.currentFractal.isEmpty)
    ) {
      this.fs.navigateModifier(ConstNavigableModifiers.Edit);
    }
  }
}
