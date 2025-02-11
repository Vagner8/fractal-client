import { Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { ConstAppEntities } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class ManagerService extends BaseService {
  $event = signal('');

  async set(event: string): Promise<void> {
    this.$event.set(event);
    await this.navigate({ [ConstAppEntities.Manager]: event });
  }

  init({ Manager }: { Manager: string }): void {
    this.$event.set(Manager);
  }
}
