import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { DataService, FractalService } from '@services';
import { AppComponent } from 'app/app.component';
import { User } from './user';
import { HarnessLoader } from '@angular/cdk/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { routes } from 'app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

interface ConfigureTestingModuleReturnType {
  user: User;
  fixture: ComponentFixture<AppComponent>;
  loader: HarnessLoader;
  component: AppComponent;
  httpTesting: HttpTestingController;
}

export const configureTestingModule = async (): Promise<ConfigureTestingModuleReturnType> => {
  await TestBed.configureTestingModule({
    imports: [AppComponent],
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

  const fixture = TestBed.createComponent(AppComponent);
  const loader = TestbedHarnessEnvironment.loader(fixture);
  const component = fixture.componentInstance;
  const httpTesting = TestBed.inject(HttpTestingController);
  const user = new User(fixture, loader, httpTesting);

  return {
    user,
    loader,
    fixture,
    component,
    httpTesting,
  };
};
