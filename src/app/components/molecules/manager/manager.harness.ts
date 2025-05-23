import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

export class ManagerHarness extends ComponentHarness {
  static readonly hostSelector = 'app-manager';

  getButton = this.locatorFor(MatButtonHarness);
}
