import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlFields, CControlMutable } from '@constants';
import { StatesService } from '@services';
import { IControl } from '@types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-control',
  standalone: true,
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
    this.control.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.ss.selectedChildren.dirtyControls.push(this.control);
      this.ss.selectedChildren.dirtyFractals.push(this.control.parent);
    });
  }

  controlClicked(): void {
    this.ss.selectedForm.clear();
    this.ss.selectedControls.toggle(this.control);
  }
}
