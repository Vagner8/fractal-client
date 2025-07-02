import { inject, Injectable } from '@angular/core';
import { StatesService } from './states.service';
import { DataService } from './data.service';
import { MODIFIERS } from '@constants';
import { CollectionChildFactory } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService {
  private readonly ds = inject(DataService);
  private readonly ss = inject(StatesService);

  new(): void {
    const collection = this.ss.selectedCollection.value;
    if (collection) {
      this.ss.newChildren.push(CollectionChildFactory(collection));
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
