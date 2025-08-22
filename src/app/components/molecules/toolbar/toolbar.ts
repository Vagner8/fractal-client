import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Manager } from '@atoms';
import { MatToolbar } from '@mat';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbar, Manager],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toolbar {}
