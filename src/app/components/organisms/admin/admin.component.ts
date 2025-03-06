import { ChangeDetectionStrategy, Component, inject, Input, OnInit, viewChild, viewChildren } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel, MatIconModule } from '@mat';
import { IFractal } from '@types';
import { FractalCollectionComponent, FractalControlsComponent } from '@components/molecules';
import { FractalService } from '@services';
import { ConstAppFractals } from '@constants';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatIconModule, MatExpansionModule, FractalControlsComponent, FractalCollectionComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  @Input() fractal!: IFractal;
  fs = inject(FractalService);
  panel = viewChild(MatExpansionPanel);
  children = viewChildren(AdminComponent);

  ngOnInit(): void {
    this.fractal.cursor === ConstAppFractals.App && this.fs.currentFractal.set(this.fractal);
  }

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
