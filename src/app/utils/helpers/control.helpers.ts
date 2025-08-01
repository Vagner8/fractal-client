import { Controls, ControlsDto, Fractal } from '@types';
import { ControlFactory } from '../factories';

export const createControls = (parent: Fractal, controlsDto?: ControlsDto): Controls | undefined =>
  controlsDto
    ? Object.fromEntries(Object.entries(controlsDto).map(([cursor, dto]) => [cursor, new ControlFactory(parent, dto)]))
    : undefined;
