import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlFields, CControlMutable, CWords, CInternalIndicators } from '@constants';
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
      .subscribe(() => this.control.parent.states.dirtyControls.push(this.control));
  }

  get shouldRender(): boolean {
    return !Object.hasOwn(CInternalIndicators, this.control.dto.indicator);
  }

  controlClicked(): void {
    this.control.parent.states.selectedControls.push(this.control);
  }
}
