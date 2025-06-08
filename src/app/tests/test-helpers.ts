import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideExperimentalZonelessChangeDetection, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { DataService, FractalService } from '@services';
import { routes } from 'app/app.routes';
import { User } from './user';
import { HarnessLoader } from '@angular/cdk/testing';

interface ConfigureTestingModuleReturnType<T> {
  user: User<T>;
  loader: HarnessLoader;
  fixture: ComponentFixture<T>;
  component: T;
  httpTesting: HttpTestingController;
}

export const configureTestingModule = async <T>(
  testComponent: Type<T>
): Promise<ConfigureTestingModuleReturnType<T>> => {
  await TestBed.configureTestingModule({
    imports: [testComponent],
    providers: [
      DataService,
      FractalService,
      provideRouter(routes, withComponentInputBinding()),
      provideAnimations(),
      provideHttpClient(),
      provideHttpClientTesting(),
      provideExperimentalZonelessChangeDetection(),
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(testComponent);
  const loader = TestbedHarnessEnvironment.loader(fixture);
  const component = fixture.componentInstance;
  const httpTesting = TestBed.inject(HttpTestingController);
  const user = new User<T>(fixture, loader, httpTesting);

  return {
    user,
    loader,
    fixture,
    component,
    httpTesting,
  };
};
