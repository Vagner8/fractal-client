import { Subscription } from 'rxjs';

export abstract class BaseComponent {
  private subs: Subscription[] = [];

  pushSub(sub: Subscription): void {
    this.subs.push(sub);
  }

  clearSubs(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
