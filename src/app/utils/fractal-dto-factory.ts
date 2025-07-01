import { INDICATORS, WORDS } from '@constants';
import { ChildrenDto, ControlDto, ControlsDto, Fractal, FractalDto } from '@types';
import { v4 } from 'uuid';

export class FractalDtoFactory implements FractalDto {
  id: string = v4();
  parentId: string;
  children: ChildrenDto | null = null;
  controls: ControlsDto = {};

  constructor(parent: Fractal) {
    this.parentId = parent.id;
    this.controls = this.createControlsDto(parent);
  }

  private readonly createControlDto = ({
    data = '',
    type = 'String',
    parentId = '',
    indicator = '',
  }: Partial<ControlDto>): ControlDto => ({
    id: v4(),
    data,
    type,
    parentId,
    indicator,
  });

  private createControlsDto(parent: Fractal): ControlsDto {
    const occ = parent.getArray('Occ');
    let indicators: string[] = [];

    if (occ.length === 0) {
      indicators = [WORDS.IDLE];
    } else {
      indicators = occ;
    }

    const controls = Object.fromEntries(
      indicators.map(indicator => [
        indicator,
        this.createControlDto({
          parentId: this.id,
          indicator,
        }),
      ])
    );

    controls[INDICATORS.CURSOR] = this.createControlDto({ data: WORDS.NEW, indicator: INDICATORS.CURSOR });

    return controls;
  }
}
