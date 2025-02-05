import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatMenuModule } from '@mat';
import { Fractal } from '@types';
import { FormComponent } from '../form/form.component';
import { TapDirective } from '@directives';

export const CollectionMenuItems = {
  Edit: 'Edit',
  Draft: 'Draft',
  New: 'New',
};

export const MenuItems = {
  ...CollectionMenuItems,
  Cancel: 'Cancel',
};

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [MatCardModule, FormComponent, MatButtonModule, MatMenuModule, MatIconModule, TapDirective],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardComponent implements OnInit {
  @Input() fractal!: Fractal;

  menuItems = Object.values(MenuItems);
  collectionMenuItems = Object.values(CollectionMenuItems);

  get menuTitle(): string {
    return this.fractal.form.disabled ? MenuItems.Draft : MenuItems.Edit;
  }

  ngOnInit(): void {
    this.toggleFrom(this.fractal.isItem);
  }

  onMenuItemHeld(menuItem: string): void {
    if (!this.fractal.isItem) return;
    if (menuItem === MenuItems.Draft) {
      this.fractal.parent.childrenForms.disable();
    }
    if (menuItem === MenuItems.Edit) {
      this.fractal.parent.childrenForms.enable();
    }
  }

  onMnuItemTouched(menuItem: string): void {
    switch (menuItem) {
      case MenuItems.New:
        break;
      case MenuItems.Edit:
        this.toggleFrom(true);
        break;
      case MenuItems.Draft:
        this.toggleFrom(false);
        break;
    }
  }

  private toggleFrom(value: boolean): void {
    const { form } = this.fractal;
    if (!value && form.enabled) form.disable();
    if (value && form.disabled) form.enable();
  }
}
