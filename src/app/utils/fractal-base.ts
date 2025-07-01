import { Children, ControlDto, ControlsDto, Fractal, FractalDto, SearchControlsProp, SearchFractalsProp } from '@types';
import {
  createChildren,
  ensureControlDtoExists,
  ensureExists,
  ensureFractalExists,
  findChildRecursively,
  parseSearch,
} from './helpers';

export class FractalBase implements Fractal {
  private readonly _parent: Fractal | null;
  id: string;
  parentId: string;
  controls: ControlsDto;
  children: Children | null = null;

  cursor: string;

  constructor(dto: FractalDto, parent: Fractal | null = null) {
    this._parent = parent;
    this.id = dto.id;
    this.parentId = dto.parentId;
    this.controls = dto.controls;
    this.children = createChildren(dto.children, this);

    this.cursor = this.getString('Cursor');
  }

  get parent(): Fractal {
    if (this._parent) {
      return this._parent;
    } else {
      throw new Error('Unable to get parent');
    }
  }

  is = (search: SearchFractalsProp): boolean => this.getString('Cursor') === parseSearch(search);

  getChild = (search: SearchFractalsProp): Fractal => ensureFractalExists(this.findChild(search), search);
  findChild = (search: SearchFractalsProp): Fractal | undefined =>
    this.children ? this.children?.[parseSearch(search)] : undefined;

  findChildRecursively = (search: SearchFractalsProp): Fractal | null => findChildRecursively(search, this.children);
  getChildRecursively = (search: SearchFractalsProp): Fractal =>
    ensureFractalExists(findChildRecursively(search, this.children), search);

  getControl = (search: SearchControlsProp): ControlDto => ensureControlDtoExists(this.findControl(search), search);
  findControl = (search: SearchControlsProp): ControlDto | null => this.controls[parseSearch(search)] ?? null;

  getString = (search: SearchControlsProp): string => this.findControl(search)?.data ?? '';
  getArray = (search: SearchControlsProp): string[] => ensureExists(this.getString(search).split(':').filter(Boolean));
}
