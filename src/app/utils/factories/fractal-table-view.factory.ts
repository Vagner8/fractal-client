import { CControlMutable, ConstControlFields, COrders } from '@constants';
import { IControlMutableDto, IFractal, IFractalTableView, TableView, TdContentProps } from '@types';
import { isConstOrderType } from '../guards';

export class FractalTableView implements IFractalTableView {
  readonly positionColumn = 'No.';

  constructor(private readonly fractal: IFractal) {}

  columns(view: TableView): string[] {
    return [
      this.positionColumn,
      ...(view === 'children' ? this.fractal.controls.getOneSplitable('Occ') : Object.values(CControlMutable)),
    ];
  }

  dataSource(view: TableView): string[] {
    return view === 'children'
      ? this.fractal.controls.getOneSplitable('Oc')
      : this.fractal.parent.controls.getOneSplitable('Occ');
  }

  tdContent({ view, index, column, indicator }: TdContentProps): string {
    if (view === 'children') {
      if (column === this.positionColumn) {
        return `${index + 1}`;
      }
      const control = this.fractal.fractals.get(indicator)?.controls.get(column);
      return control?.dto.field === ConstControlFields.Select
        ? control.dto.data.split(':')[0]
        : (control?.dto.data ?? '');
    } else {
      const value = this.fractal.controls.get(indicator)?.dto[column as keyof IControlMutableDto];
      return value && isConstOrderType(value) ? COrders[value] : (value ?? '');
    }
  }

  onChildHold(): void {
    this.fractal.states.toggleAllSelectedChildren();
  }

  onChildTouch(row: string): void {
    this.fractal.states.selectedChildren.toggle(this.fractal.fractals.get(row));
  }

  isChildSelected(row: string): boolean {
    return this.fractal.states.selectedChildren.has(this.fractal.fractals.get(row));
  }
}
