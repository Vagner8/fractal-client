import { inject, Injectable } from '@angular/core';
import { StatesService } from './states.service';
import { DataService } from './data.service';
import { MODIFIERS } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService {
  private readonly ds = inject(DataService);
  private readonly ss = inject(StatesService);

  newTouched(): void {}

  newTouchedOnEditPage(): void {}

  newTouchedOnTablePage(): void {}

  edit(): void {
    this.ss.setModifier(MODIFIERS.EDIT);
  }

  save(): void {}
}
