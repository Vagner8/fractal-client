import { computed, Injectable, signal } from '@angular/core';
import { ParamMap } from '@angular/router';
import { CAppFractals } from '@constants';
import { FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  selectedFractal = new FractalState(null);
  selectedSidenavTaps = new FractalState(null);

  $paramMap = signal<ParamMap | null>(null);
  $onEditPage = computed<boolean>(() => !!this.$paramMap()?.get(CAppFractals.Modifiers));
}
