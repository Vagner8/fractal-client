import { Component, inject, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstAppEvents, ConstNavigableModifiers, ConstModifiers, ConstAppFractals } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { DeleteService, EventService, FractalService, StatesService, UpdateService } from '@services';
import { IFractal } from '@types';
import { Fractal } from '@utils';
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
  private readonly us = inject(UpdateService);
  private readonly des = inject(DeleteService);

  AppEvents = ConstAppEvents;
  AppFractals = ConstAppFractals;

  onPageTouched(page: IFractal): void {
    this.ss.currentFractal.set(page);
    this.ss.markSelectedFractalsPristine();
    this.fs.navigatePage(page.cursor);
  }

  onModifierHeld = (modifier: IFractal): void => {
    const handler: Record<string, () => void> = {
      [Edit]: () => {},

      [Save]: () => {
        this.us.update();
      },

      [Delete]: () => {
        this.des.delete();
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

  private navigateToEditPage({ cursor }: IFractal): void {
    if (
      Object.hasOwn(ConstNavigableModifiers, cursor) &&
      (!this.ss.selectedChildren.isEmpty || !this.ss.currentFractal.isEmpty)
    ) {
      this.fs.navigateModifier(ConstNavigableModifiers.Edit);
    }
  }
}
