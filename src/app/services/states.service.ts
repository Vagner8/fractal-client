import { inject, Injectable, signal } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { APP_PAGES, QUERY_PARAMS } from '@constants';
import { ConstantsValues, Control, Fractal, TapEvents } from '@types';
import { FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  router = inject(Router);

  $app = signal<Fractal | null>(null);

  selectedFractal = new FractalState();
  closedPanel = new FractalState();

  selectedCollection = new FractalState();

  controlToUpdate: Control[] = [];

  $showModifiersTaps = signal(false);
  $managerEvent = signal<TapEvents | null>(null);
  $isFullEditModeActivated = signal(true);
  $isHoldEventRunning = signal(false);

  settings: Fractal | null = null;
  modifiers: Fractal | null = null;
  collections: Fractal | null = null;

  $editorParam = signal<string | null>(null);
  $queryParams = signal<Partial<Record<ConstantsValues<typeof QUERY_PARAMS>, string>>>({});
  $collectionParam = signal<string | null>(null);

  async setManager(managerEvent: TapEvents): Promise<void> {
    this.$managerEvent.set(managerEvent);
    this.navigate([], { [QUERY_PARAMS.MANAGER]: managerEvent });
  }

  async setModifier(param: string | null): Promise<void> {
    this.$editorParam.set(param);
    this.navigate([this.$collectionParam(), APP_PAGES.EDITOR], { [QUERY_PARAMS.MODIFIERS]: param });
  }

  async setCollection(collection: Fractal): Promise<void> {
    this.$collectionParam.set(collection.cursor);

    this.navigate([collection.cursor], { [QUERY_PARAMS.MODIFIERS]: null });
  }

  private async navigate(commands: unknown[], queryParams?: NavigationExtras['queryParams']): Promise<void> {
    this.router.navigate(commands, {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
