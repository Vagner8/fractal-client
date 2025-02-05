import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  holdRun$ = new Subject<void>();
  holdEnd$ = new Subject<void>();
}
