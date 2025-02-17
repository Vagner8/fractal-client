import { ObjectState } from './abstract-states/object-state';
import { ConstParams } from '@constants';

export class ManagerState extends ObjectState<string | null> {
  constructor() {
    super(null);
  }

  async setAndNavigate(event: string | null): Promise<void> {
    super.set(event);
    this.router.navigate([], {
      queryParams: {
        [ConstParams.Manager]: event,
      },
      queryParamsHandling: 'merge',
    });
  }
}
