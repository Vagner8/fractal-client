import { Subscription } from 'rxjs';

export abstract class BaseComponent {
  private subs: Subscription[] = [];

  pushSub(sub: Subscription | undefined): void {
    sub && this.subs.push(sub);
  }

  clearSubs(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
