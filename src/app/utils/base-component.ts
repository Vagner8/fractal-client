import { Subscription } from 'rxjs';

export abstract class BaseComponent {
  private subs: Subscription[] = [];

  push(sub: Subscription): void {
    this.subs.push(sub);
  }

  clear(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
