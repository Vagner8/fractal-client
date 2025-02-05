import { Injectable, signal } from '@angular/core';
import { AppEntities } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerService extends BaseService {
  $event = signal('');

  async set(event: string): Promise<void> {
    this.$event.set(event);
    await this.navigate({ [AppEntities.Manager]: event });
  }

  init({ Manager }: { Manager: string }): void {
    this.$event.set(Manager);
  }
}
