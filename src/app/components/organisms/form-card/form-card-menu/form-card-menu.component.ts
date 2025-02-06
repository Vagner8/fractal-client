import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { MatButtonModule, MatMenuModule } from '@mat';
import { TapDirective } from '@directives';
import { Fractal } from '@types';
import { FormControlStatus } from '@angular/forms';
import { FormCardMenuBunchItems, FormCardMenuCollectionItems, FormCardMenuItems } from '@constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-card-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, TapDirective],
  templateUrl: './form-card-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardMenuComponent implements OnInit, OnDestroy {
  @Input() fractal!: Fractal;
  touch = output<string>();

  $title = signal('');

  items = FormCardMenuItems;
  bunchItems = FormCardMenuBunchItems;
  collectionItems = FormCardMenuCollectionItems;

  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.toggleFrom(this.fractal.isItem);
    this.subs.push(
      this.fractal.parent.childrenForms.statusChanges.subscribe(value =>
        this.$title.set(this.formControlStatusMap(value))
      )
    );
  }

  onMenuItemHeld(item: string): void {
    if (this.$title() === item) return;
    if (item === this.items.Edit) this.fractal.parent.childrenForms.enable();
    if (item === this.items.Draft) this.fractal.parent.childrenForms.disable();
  }

  onMnuItemTouched(item: string): void {
    if (this.$title() === item) return;
    this.touch.emit(item);
    switch (item) {
      case this.items.Edit:
        this.toggleFrom(true);
        break;
      case this.items.Draft:
        this.toggleFrom(false);
        break;
    }
  }

  private toggleFrom(value: boolean): void {
    this.$title.set(this.items[value ? 'Edit' : 'Draft']);
    this.fractal.form[value ? 'enable' : 'disable']();
  }

  private formControlStatusMap(status: FormControlStatus): string {
    const formControlStatus: Partial<Record<FormControlStatus, string>> = {
      VALID: this.items.Edit,
      DISABLED: this.items.Draft,
    };
    return formControlStatus[status] || this.bunchItems.Edit;
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
