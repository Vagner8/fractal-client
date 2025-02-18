import { ObjectState } from './abstract-states/object-state';
import { ConstEditMods, ConstModifiers, ConstParams } from '@constants';
import { signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class ModifiersState extends ObjectState<string | null> {
  $editMode = signal<string | null>(null);

  hold$ = new BehaviorSubject<string | null>(null);
  touch$ = new BehaviorSubject<string | null>(null);

  constructor() {
    super(null);
  }

  override set(modifier: string | null): void {
    if (modifier && modifier === ConstModifiers.Edit) this.updateEditMode();
    super.set(modifier);
  }

  init(modifier: string, editMode: string): void {
    super.set(modifier);
    this.$editMode.set(editMode ? editMode : null);
  }

  async setAndNavigate(modifier: string | null): Promise<void> {
    this.set(modifier);
    this.router.navigate([], {
      queryParams: {
        [ConstParams.EditMode]: this.$editMode(),
        [ConstParams.Modifiers]: modifier,
      },
      queryParamsHandling: 'merge',
    });
  }

  override clear(): void {
    super.clear();
    this.$editMode.set(null);
  }

  private updateEditMode(): void {
    const { Controls, Fractals } = ConstEditMods;
    this.$editMode.update(prev => (!prev || prev === Controls ? Fractals : Controls));
  }
}
