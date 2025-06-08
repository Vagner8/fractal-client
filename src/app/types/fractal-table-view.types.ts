export type TableView = 'children' | 'controls';

export interface TdContentProps {
  view: TableView;
  index: number;
  column: string;
  indicator: string;
}

export interface IFractalTableView {
  positionColumn: string;
  columns(view: TableView): string[];
  tdContent(props: TdContentProps): string;
  dataSource(view: TableView): string[];

  onChildHold(): void;
  onChildTouch(row: string): void;
  isChildSelected(row: string): boolean;
}
