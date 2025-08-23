import { ChildrenDto, Controls, ControlsDto, Fractal, FractalDto } from '@types';
import { ControlDtoFactory } from './control-dto.factory';

export class FractalDtoFactory implements FractalDto {
  cursor: string;
  parentCursor: string | null;
  controls: ControlsDto | null;
  children: ChildrenDto | null;
  childrenControls: ControlsDto | null;

  constructor(fractal: Fractal) {
    const { cursor, parentCursor, controls, childrenControls } = fractal;
    this.cursor = cursor;
    this.parentCursor = parentCursor;
    this.children = null;
    this.controls = controls && this.toControlsDto(controls);
    this.childrenControls = childrenControls && this.toControlsDto(childrenControls);
  }

  toControlsDto = (controls: Controls): ControlsDto =>
    Object.fromEntries(Object.entries(controls).map(([key, control]) => [key, new ControlDtoFactory(control)]));
}
