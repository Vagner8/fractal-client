import { IControl, IControlMutableDto, IFractal } from '@types';
import { Control } from './control';
import { ControlDto } from './control-dto';

export const ControlFactory = (parent: IFractal, values?: Partial<IControlMutableDto>): IControl =>
  new Control(new ControlDto(parent.dto.id, values), parent, { syncFormWithDto: true });
