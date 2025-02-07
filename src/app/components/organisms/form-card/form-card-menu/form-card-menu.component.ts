import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { MatButtonModule, MatMenuModule } from '@mat';
import { TapDirective } from '@directives';
import { Fractal } from '@types';
import { FormControlStatus } from '@angular/forms';
import { ControlMenuBunchItems, ControlMenuCollectionItems, ControlMenuItems } from '@constants';
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

  items = ControlMenuItems;
  bunchItems = ControlMenuBunchItems;
  collectionItems = ControlMenuCollectionItems;

  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.toggleFrom(this.fractal.isItem);
    this.subs.push(
      this.fractal.form.statusChanges.subscribe(value => {
        this.$title.set(this.formControlStatusMap(value));
      })
    );
  }

  onMenuItemHeld(item: string): void {
    ({
      [this.items.Edit]: (): void => this.toggleAllForms(true),
      [this.items.Draft]: (): void => this.toggleAllForms(false),
    })[item]();
  }

  onMnuItemTouched(item: string): void {
    if (this.$title() === item) return;
    this.touch.emit(item);
    ({
      [this.items.Edit]: (): void => this.toggleFrom(true),
      [this.items.Draft]: (): void => this.toggleFrom(false),
    })[item]?.();
  }

  private toggleFrom(value: boolean): void {
    this.$title.set(this.items[value ? 'Edit' : 'Draft']);
    this.fractal.form[value ? 'enable' : 'disable']();
  }

  private toggleAllForms(value: boolean): void {
    Object.values(this.fractal.parent.childrenForms.controls).forEach(form => form[value ? 'enable' : 'disable']());
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
