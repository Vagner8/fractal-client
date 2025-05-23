import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentHarness, HarnessLoader } from '@angular/cdk/testing';
import { DataService, FractalService } from '@services';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CHoldThreshold, ENV } from '@constants';
import { appMock } from '@utils';
import { ManagerHarness } from './components/molecules/manager/manager.harness';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCellHarness, MatRowHarness } from '@angular/material/table/testing';
import { provideRouter, Router, RouterModule, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { SpyLocation } from '@angular/common/testing';
import { Location } from '@angular/common';
import { ScreenComponent, ScreenHarness } from '@components/organisms';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;
  let component: AppComponent;
  let httpTesting: HttpTestingController;

  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
  });

  beforeEach(() => {
    // router = TestBed.inject(Router);
    // location = TestBed.inject(Location);
    httpTesting = TestBed.inject(HttpTestingController);
    // router.initialNavigation();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it('', async () => {
    fixture.detectChanges();
    const req = httpTesting.expectOne(`${ENV.API}/fractal?id=${ENV.ID}`);
    req.flush(appMock);
    expect(req.request.method).toBe('GET');
    const manager = await loader.getHarness(ManagerHarness);
    const managerButton = await manager.getButton();
    await managerButton.click();
    // await managerButton.click();
    const emptyCollectionTap = await loader.getHarness(MatButtonHarness.with({ text: /EmptyCollection/i }));
    const populatedCollectionTap = await loader.getHarness(MatButtonHarness.with({ text: /PopulatedCollection/i }));
    await populatedCollectionTap.click();

    fixture.detectChanges();
    await fixture.whenStable();
    // const screenComponent = fixture.debugElement.query(By.directive(ScreenComponent))
    //   .componentInstance as ScreenComponent;
    // screenComponent.Page = 'PopulatedCollection';
    // fixture.detectChanges();
    console.log('🚀 ~ Page', fixture.nativeElement.querySelector('#Page'));
    // expect(location.path()).toContain('PopulatedCollection');
    // const screen = await loader.getHarness(ScreenHarness);
    // const screenHost = await screen

    // const table = await loader.getHarness(MatRowHarness);

    // fixture.nativeElement.querySelected('#Dima');
    // console.log("🚀 ~ fixture.nativeElement.querySelected('#Dima'):", fixture.nativeElement.querySelector('#Dima'));
  });
});
