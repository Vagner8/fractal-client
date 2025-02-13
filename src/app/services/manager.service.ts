import { effect, inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { ConstParams } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  bs = inject(BaseService);
  $event = signal<string | null>(null);

  constructor() {
    effect(() => this.bs.navigate({ [ConstParams.Manager]: this.$event() }));
  }

  set(event: string): void {
    this.$event.set(event);
  }

  init({ Manager }: { Manager: string }): void {
    this.$event.set(Manager);
  }
}
