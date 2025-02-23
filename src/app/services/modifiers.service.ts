import { inject, Injectable } from '@angular/core';
import { ConstEditMods, ConstModifiers } from '@constants';
import { SelectService } from './select.service';
import { CreateControlsService } from './create-controls.service';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService {
  private ss = inject(SelectService);
  private ccs = inject(CreateControlsService);

  private get holdHandlers(): { [key: string]: () => boolean | Promise<boolean> } {
    const { Save, Edit } = ConstModifiers.record;
    const { currentFractal, selectedFractals } = this.ss;
    return {
      [Edit]: async (): Promise<boolean> => {
        !selectedFractals.has(currentFractal.value) && (await selectedFractals.pushAndNavigate(currentFractal.value));
        return true;
      },
      [Save]: (): boolean => {
        if (this.ccs.newControlsFormsMap.size > 0) {
          this.ccs.addNewControlsFormsToFractalAndSave();
        }
        return false;
      },
    };
  }

  private get touchHandlers(): { [key: string]: () => boolean | Promise<boolean> } {
    const { New, Edit, Delete } = ConstModifiers.record;
    const { Controls } = ConstEditMods;
    const { editMode, modifiers, selectedFractals, selectFractalFrom, selectedControls } = this.ss;
    return {
      [New]: (): boolean => {
        if (editMode.has(Controls) && selectFractalFrom.value) {
          selectFractalFrom.value.pushNewControl();
        }
        return false;
      },
      [Edit]: (): boolean => {
        modifiers.has(Edit) && editMode.toggleAndNavigate();
        return !selectedFractals.isEmpty;
      },
      [Delete]: async (): Promise<boolean> => {
        if (!selectedControls.isEmpty) {
          return false;
        }
        if (!selectFractalFrom.isEmpty) {
          await selectedFractals.deleteAndNavigate(selectFractalFrom.value);
        }
        if (selectedFractals.isEmpty) {
          await this.ss.modifiers.clear();
        }
        return false;
      },
    };
  }

  async onHold(modifier: string): Promise<void> {
    const shouldNavigate = await this.holdHandlers[modifier]?.();
    shouldNavigate && this.ss.modifiers.setAndNavigate(modifier);
  }

  async onTouch(modifier: string): Promise<void> {
    const shouldNavigate = await this.touchHandlers[modifier]?.();
    shouldNavigate && this.ss.modifiers.setAndNavigate(modifier);
  }
}
