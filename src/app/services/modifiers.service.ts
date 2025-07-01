import { inject, Injectable } from '@angular/core';
import { StatesService } from './states.service';
import { DataService } from './data.service';
import { MODIFIERS } from '@constants';
import { FractalBase } from '@utils';
import { FractalDtoFactory } from 'app/utils/fractal-dto-factory';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService {
  private readonly ds = inject(DataService);
  private readonly ss = inject(StatesService);

  new(): void {
    const { value } = this.ss.selectedCollection;
    if (value) {
      const newFractalDto = new FractalDtoFactory(value);
      const newFractal = new FractalBase(newFractalDto, value);
      this.ss.newChildren.push(newFractal);
      this.ss.setModifier(MODIFIERS.NEW);
    }
  }

  newTouchedOnEditPage(): void {}

  newTouchedOnTablePage(): void {}

  edit(): void {
    this.ss.setModifier(MODIFIERS.EDIT);
  }

  save(): void {}
}
