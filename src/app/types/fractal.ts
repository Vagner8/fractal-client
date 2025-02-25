import { ControlsDto } from './control';
import { WritableSignal } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { RecordControls, RecordFractals } from './records';
import { BehaviorSubject } from 'rxjs';

export type FractalsDto = Record<string, FractalDto>;

export interface FractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: ControlsDto;
}

export interface Fractal {
  dto: FractalDto;
  form: FormRecord;
  parent: FractalCollection;
  controls: RecordControls;
  $selected: WritableSignal<boolean>;
  is(value: string | object): boolean;
}

export interface FractalCollection extends Fractal {
  parent: FractalCollection;
  fractals: RecordFractals;

  heldChildren$: BehaviorSubject<Fractal | null>;
  touchedChildren$: BehaviorSubject<Fractal | null>;

  unselectAllChildren(): void;
  getSelectedCollection(): FractalCollection | null;
}
