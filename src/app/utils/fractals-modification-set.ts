import { IFractalDto } from '@types';

export class FractalsModificationSet {
  public readonly toAdd: IFractalDto[] = [];
  public readonly toDelete: IFractalDto[] = [];
}
