import { IControlDto } from '@types';

export class ControlsModificationSet {
  public readonly toAdd: IControlDto[] = [];
  public readonly toUpdate: IControlDto[] = [];
  public readonly toDelete: IControlDto[] = [];
}
