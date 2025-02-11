import { ConstControlInputs, ConstIndicators, ConstSplitIndicators } from '@constants';
import { ControlsDto, Fractal, FractalDto, FractalsDto } from '@types';
import { v4 } from 'uuid';

export class FractalDtoFactory implements FractalDto {
  id: string;
  parentId: string;
  controls: ControlsDto;
  fractals: FractalsDto | null;

  constructor(parent: Fractal) {
    this.id = v4();
    this.parentId = parent.dto.id;
    this.fractals = null;

    this.controls = parent.isCollection ? this.itemControls(this.id, parent) : this.collectionControls(this.id);
  }

  private collectionControls(id: string): ControlsDto {
    return {
      [ConstIndicators.Cursor]: {
        id: v4(),
        data: '',
        input: ConstControlInputs.Text,
        parentId: id,
        indicator: ConstIndicators.Cursor,
      },
      [ConstSplitIndicators.Sort]: {
        id: v4(),
        data: '',
        input: ConstControlInputs.Organizer,
        parentId: id,
        indicator: ConstSplitIndicators.Sort,
      },
    };
  }

  private itemControls(id: string, collection: Fractal): ControlsDto {
    if (collection.childrenFractals.length === 0) {
      return collection.splitControlData(ConstSplitIndicators.Sort).reduce((acc: ControlsDto, column) => {
        acc[column] = {
          id: v4(),
          data: '',
          input: ConstControlInputs.Text,
          parentId: id,
          indicator: column,
        };
        return acc;
      }, {});
    } else {
      const copy: ControlsDto = {};

      for (const indicator in collection.childrenFractals[0].dto.controls) {
        const control = collection.childrenFractals[0].dto.controls[indicator];
        copy[indicator] = {
          ...control,
          id: v4(),
          parentId: id,
          data: control.input === ConstControlInputs.Text ? '' : control.data,
        };
      }

      return copy;
    }
  }
}
