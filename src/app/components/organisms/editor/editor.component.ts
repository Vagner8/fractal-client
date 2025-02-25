import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { ListComponent } from '@components/atoms';
import { Fractal, FractalCollection } from '@types';
import { BaseComponent } from '@utils';
import { FractalService } from '@services';
import { ConstModifiers } from '@constants';
import { filter } from 'rxjs';
import { FractalFormComponent } from '@components/molecules';

const { New, Edit } = ConstModifiers;

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FractalFormComponent, ListComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent extends BaseComponent implements OnInit {
  @Input() collection!: FractalCollection;
  fs = inject(FractalService);

  ngOnInit(): void {
    this.fs.modifiers?.touchedChildren$.pipe(filter(Boolean)).subscribe(this.onModifierTouched);
  }

  onModifierTouched = (modifier: Fractal): void => {
    const handler: Record<string, () => void> = {
      [New]: () => {},
      [Edit]: () => {},
    };
    handler[modifier.controls.getData('Cursor')]?.();
  };
}
