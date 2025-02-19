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

  private get holdHandlers(): { [key: string]: () => void } {
    const { Save } = ConstModifiers.record;
    return {
      [Save]: (): void => {
        if (this.ccs.newControlsFormsMap.size > 0) {
          this.ccs.addNewControlsFormsToFractalAndSave();
        }
      },
    };
  }

  private get touchHandlers(): { [key: string]: () => boolean } {
    const { New, Edit, Delete } = ConstModifiers.record;
    const { Controls } = ConstEditMods;
    const { selectedFractalForm } = this.ss;
    return {
      [New]: (): boolean => {
        if (this.ss.modifiers.$editMode() === Controls) {
          selectedFractalForm.value && this.ccs.pushNewControlForm(selectedFractalForm.value);
          return false;
        }
        return false;
      },
      [Edit]: (): boolean => {
        return true;
      },
      [Delete]: (): boolean => {
        return false;
      },
    };
  }

  onHold(modifier: string): void {
    this.holdHandlers[modifier]();
  }

  onTouch(modifier: string): void {
    this.navigate(this.touchHandlers[modifier](), modifier);
  }

  private navigate(shouldNavigate: boolean, modifier: string): void {
    shouldNavigate && this.ss.modifiers.setAndNavigate(modifier);
  }
}
