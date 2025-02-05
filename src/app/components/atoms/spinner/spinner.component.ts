import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@mat';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements OnInit {
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  @Input() value = 0;
  timeout$!: Observable<number>;
  diameter = 42;
  strokeWidth = 3;

  ngOnInit(): void {
    this.timeout$ = interval(200).pipe(map(num => num + 100));
  }
}
