import { Event, NavigationEnd } from '@angular/router';

export const isNavigationEnd = (event: Event): event is NavigationEnd => event instanceof NavigationEnd;
