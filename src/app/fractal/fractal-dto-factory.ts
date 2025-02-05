import { ControlInputs, ControlsDto, Fractal, FractalDto, FractalsDto, Indicators, SplitIndicators } from '@types';
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
      [Indicators.Cursor]: {
        id: v4(),
        data: '',
        input: ControlInputs.Text,
        parentId: id,
        indicator: Indicators.Cursor,
      },
      [SplitIndicators.Sort]: {
        id: v4(),
        data: '',
        input: ControlInputs.Organizer,
        parentId: id,
        indicator: SplitIndicators.Sort,
      },
    };
  }

  private itemControls(id: string, collection: Fractal): ControlsDto {
    if (collection.children.length === 0) {
      return collection.splitControlData(SplitIndicators.Sort).reduce((acc: ControlsDto, column) => {
        acc[column] = {
          id: v4(),
          data: '',
          input: ControlInputs.Text,
          parentId: id,
          indicator: column,
        };
        return acc;
      }, {});
    } else {
      const copy: ControlsDto = {};

      for (const indicator in collection.children[0].dto.controls) {
        const control = collection.children[0].dto.controls[indicator];
        copy[indicator] = {
          ...control,
          id: v4(),
          parentId: id,
          data: control.input === ControlInputs.Text ? '' : control.data,
        };
      }

      return copy;
    }
  }
}
