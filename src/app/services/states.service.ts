import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { APP_PAGES, QUERY_PARAMS } from '@constants';
import { ConstantsValues, Fractal } from '@types';
import { FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  router = inject(Router);

  $app = signal<Fractal | null>(null);

  selectedChildren = new FractalsState();
  selectedCollection = new FractalState();

  $sidenavTaps = signal<Fractal | null>(null);
  $managerEvent = signal<string | null>(null);
  $isHoldEventRunning = signal(false);

  manager!: Fractal;
  modifiers!: Fractal;
  collections!: Fractal;

  $editorParam = signal<string | null>(null);
  $queryParams = signal<Partial<Record<ConstantsValues<typeof QUERY_PARAMS>, string>>>({});
  $collectionParam = signal<string | null>(null);

  init = (event: NavigationEnd): void => {
    const { queryParams, collectionParam } = this.getSegments(event);
    this.$sidenavTaps.set(this.collections);
    queryParams.Manager && this.$managerEvent.set(queryParams.Manager);
    this.selectedCollection.set(this.collections.getChild([collectionParam]));
  };

  navigationEnd = (event: NavigationEnd): void => {
    const { queryParams, editorParam, collectionParam } = this.getSegments(event);

    this.$queryParams.set(queryParams);
    this.$editorParam.set(editorParam || null);
    this.$collectionParam.set(collectionParam || null);
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
    this.selectedCollection.set(collection);
    this.$collectionParam.set(collection.cursor);
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
