import { ChangeDetectionStrategy, Component, inject, Input, viewChild, viewChildren } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel, MatIconModule } from '@mat';
import { IFractal } from '@types';
import { FractalCollectionComponent, FractalControlsComponent } from '@components/molecules';
import { FractalService } from '@services';
import { ConstOrder } from '@constants';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatIconModule, MatExpansionModule, FractalControlsComponent, FractalCollectionComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  @Input() fractal!: IFractal;
  fs = inject(FractalService);
  panel = viewChild(MatExpansionPanel);
  children = viewChildren(AdminComponent);

  Order = ConstOrder;

  close(): void {
    this.panel()?.close();
  }

  closed(): void {
    this.children().forEach(child => child.close());
  }

  afterExpand(fractal: IFractal): void {
    this.fs.currentFractal.set(fractal);
  }

  afterCollapse(fractal: IFractal): void {
    this.fs.currentFractal.set(fractal.parent);
  }
}
