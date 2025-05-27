import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlFields, CControlMutable, CWords } from '@constants';
import { StatesService } from '@services';
import { IControl } from '@types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-control',
  imports: [CardComponent, InputComponent, SelectComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss',
})
export class ControlComponent implements OnInit {
  @Input() control!: IControl;
  @Input() fullEditMode = false;
  ss = inject(StatesService);
  destroyRef = inject(DestroyRef);
  ControlFields = ConstControlFields;
  ControlMutable = CControlMutable;
  ControlFieldsValues = Object.values(ConstControlFields);

  ngOnInit(): void {
    this.control.form.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(() => this.control.parent.cursor !== CWords.New)
      )
      .subscribe(() => {
        this.ss.dirtySelectedControls.pushUnique(this.control);
        this.ss.dirtySelectedFractals.pushUnique(this.control.parent);
      });
  }

  controlClicked(): void {
    this.ss.selectedFractalForm.clear();
    this.ss.selectedControls.toggle(this.control);
  }
}
