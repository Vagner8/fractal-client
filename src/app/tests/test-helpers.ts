import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideExperimentalZonelessChangeDetection, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StatesService } from '@services';
// import { User } from './user';
import { HarnessLoader } from '@angular/cdk/testing';
import { User } from './user';

// interface ConfigureTestingModuleReturnType<T> {
//   user: User<T>;
//   loader: HarnessLoader;
//   fixture: ComponentFixture<T>;
//   component: T;
//   httpTesting: HttpTestingController;
// }

// export const configureTestingModule = async <T>(
//   testComponent: Type<T>
// ): Promise<ConfigureTestingModuleReturnType<T>> => {
//   await TestBed.configureTestingModule({
//     imports: [testComponent],
//     providers: [
//       DataService,
//       FractalService,
//       provideRouter(routes, withComponentInputBinding()),
//       provideAnimations(),
//       provideHttpClient(),
//       provideHttpClientTesting(),
//       provideExperimentalZonelessChangeDetection(),
//     ],
//   }).compileComponents();

//   const fixture = TestBed.createComponent(testComponent);
//   const loader = TestbedHarnessEnvironment.loader(fixture);
//   const component = fixture.componentInstance;
//   const httpTesting = TestBed.inject(HttpTestingController);
//   const user = new User<T>(fixture, loader, httpTesting);

//   return {
//     user,
//     loader,
//     fixture,
//     component,
//     httpTesting,
//   };
// };

interface ConfigureCommonTestingModuleReturnType<T> {
  user: User<T>;
  loader: HarnessLoader;
  fixture: ComponentFixture<T>;
  component: T;
}

export const configureCommonTestingModule = async <T>(
  component: Type<T>
): Promise<ConfigureCommonTestingModuleReturnType<T>> => {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [StatesService, provideAnimations(), provideExperimentalZonelessChangeDetection()],
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
