import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { APP_EVENTS, APP_PAGES, QUERY_PARAMS } from '@constants';
import { ConstantsValues, Control, Fractal } from '@types';
import { FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  router = inject(Router);

  $app = signal<Fractal | null>(null);

  newChildren = new FractalsState();
  selectedChildren = new FractalsState();
  selectedCollection = new FractalState();

  controlToUpdate: Control[] = [];

  $sidenavTaps = signal<Fractal | null>(null);
  $managerEvent = signal<string | null>(null);
  $isFullEditModeActivated = signal(true);
  $isHoldEventRunning = signal(false);

  manager: Fractal | null = null;
  modifiers: Fractal | null = null;
  collections: Fractal | null = null;

  $editorParam = signal<string | null>(null);
  $queryParams = signal<Partial<Record<ConstantsValues<typeof QUERY_PARAMS>, string>>>({});
  $collectionParam = signal<string | null>(null);

  init = (): void => {
    const collectionParam = this.$collectionParam();
    this.$sidenavTaps.set(this.collections);
    this.$managerEvent.set(this.$queryParams().Manager ?? APP_EVENTS.HOLD);
    this.collections && collectionParam && this.selectedCollection.set(this.collections.findChild([collectionParam]));
  };

  navigationEnd = (event: NavigationEnd): void => {
    const { queryParams, editorParam, collectionParam } = this.getSegments(event);

    this.$queryParams.set(queryParams);
    this.$editorParam.set(editorParam);
    this.$collectionParam.set(collectionParam);
  };

  async setManager(managerEvent: string | null): Promise<void> {
    this.$managerEvent.set(managerEvent);
    this.navigate([], { [QUERY_PARAMS.MANAGER]: managerEvent });
  }

  async setModifier(param: string | null): Promise<void> {
    this.$editorParam.set(param);
    this.navigate([this.$collectionParam(), APP_PAGES.EDITOR], { [QUERY_PARAMS.MODIFIERS]: param });
  }

  async setCollection(collection: Fractal): Promise<void> {
    this.$collectionParam.set(collection.cursor);
    this.selectedCollection.set(collection);

    this.newChildren.set([]);
    this.selectedChildren.set([]);

    this.navigate([collection.cursor], { [QUERY_PARAMS.MODIFIERS]: null });
  }

  private async navigate(commands: unknown[], queryParams?: NavigationExtras['queryParams']): Promise<void> {
    this.router.navigate(commands, {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  private getSegments(event: NavigationEnd): {
    collectionParam: string;
    editorParam: string;
    queryParams: Partial<Record<ConstantsValues<typeof QUERY_PARAMS>, string>>;
  } {
    const url = new URL(event.urlAfterRedirects, window.location.origin);
    const [collectionParam, editorParam] = url.pathname.split('/').filter(Boolean);

    const queryParams: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    return { collectionParam, editorParam, queryParams };
  }
}
