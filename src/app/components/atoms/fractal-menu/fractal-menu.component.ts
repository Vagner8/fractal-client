import { Component, inject, Input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { FractalMenuItems } from '@constants';
import { TapDirective } from '@directives';
import { MatButtonModule, MatMenuModule } from '@mat';
import { SelectService } from '@services';
import { Fractal } from '@types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fractal-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, TapDirective],
  templateUrl: './fractal-menu.component.html',
})
export class FractalMenuComponent implements OnInit, OnDestroy {
  ss = inject(SelectService);
  @Input() fractal!: Fractal;
  touch = output<string>();
  $title = signal<string>(FractalMenuItems.On);
  items = FractalMenuItems;
  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.toggleFrom(this.fractal.isItem);
    this.subs.push(
      this.fractal.form.statusChanges.subscribe(value => {
        this.$title.set(this.formControlStatusMap(value));
      })
    );
  }

  getItems(): string[] {
    const { strings, Away } = this.items;
    return this.fractal.isItem ? strings : strings.filter(item => item !== Away);
  }

  onItemHeld(item: string): void {
    ({
      [this.items.On]: (): void => this.toggleAllForms(true),
      [this.items.Off]: (): void => this.toggleAllForms(false),
      [this.items.Away]: (): void => this.ss.$fractals.clear(),
    })[item]?.();
  }

  onItemTouched(item: string): void {
    if (this.$title() === item) return;
    this.touch.emit(item);
    ({
      [this.items.On]: (): void => this.toggleFrom(true),
      [this.items.Off]: (): void => this.toggleFrom(false),
      [this.items.Away]: (): void => this.ss.$fractals.delete(this.fractal),
    })[item]?.();
  }

  private toggleFrom(value: boolean): void {
    this.$title.set(this.items[value ? 'On' : 'Off']);
    this.fractal.form[value ? 'enable' : 'disable']();
  }

  private toggleAllForms(value: boolean): void {
    Object.values(this.fractal.parent.childrenForms.controls).forEach(form => form[value ? 'enable' : 'disable']());
  }

  private formControlStatusMap(status: FormControlStatus): string {
    const formControlStatus: Partial<Record<FormControlStatus, string>> = {
      VALID: this.items.On,
      DISABLED: this.items.Off,
    };
    return formControlStatus[status] || this.items.On;
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
