import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideExperimentalZonelessChangeDetection, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DataService, EventService, FractalService, ModifiersService, StatesService } from '@services';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { User } from './user';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

interface ConfigureTestingModuleReturnType<T> {
  user: User<T>;
  loader: HarnessLoader;
  fixture: ComponentFixture<T>;
  component: T;
}

export const configureTestingModule = async <T>(component: Type<T>): Promise<ConfigureTestingModuleReturnType<T>> => {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [
      DataService,
      EventService,
      StatesService,
      FractalService,
      ModifiersService,
      provideRouter([]),
      provideAnimations(),
      provideHttpClient(),
      provideHttpClientTesting(),
      provideExperimentalZonelessChangeDetection(),
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  const loader = TestbedHarnessEnvironment.loader(fixture);

  return {
    user: new User<T>(fixture, loader),
    loader: TestbedHarnessEnvironment.loader(fixture),
    fixture,
    component: fixture.componentInstance,
  };
};
