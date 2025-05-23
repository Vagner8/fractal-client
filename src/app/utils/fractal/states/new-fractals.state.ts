import { IFractal, INewFractalsState } from '@types';
import { FractalsState } from './fractals.state';
import { Fractal } from '../factories';
import { CIndicators } from '@constants';

export class NewFractalsState extends FractalsState implements INewFractalsState {
  selectedParentFractal: IFractal | null = null;

  pushNew(): void {
    if (this.selectedParentFractal) {
      this.push(new Fractal({ parent: this.selectedParentFractal, options: { populateFromOcc: true } }));
    }
  }

  setCopies(fractals: IFractal[]): void {
    this.set(
      fractals.map(({ dto, parent }) => {
        delete dto.controls[CIndicators.Cursor];
        return new Fractal({ dto, parent });
      })
    );
  }
}
