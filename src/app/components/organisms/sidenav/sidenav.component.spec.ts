import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { IFractal } from '@types';
import { appMock, Fractal } from '@utils';
import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { EventService, FractalService, StatesService, UpdateService } from '@services';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { CAppFractals, CModifiers } from '@constants';
import { Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dummy',
  standalone: true,
  template: '<div>DummyComponent</div>',
})
export class DummyComponent {}

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let loader: HarnessLoader;

  let router: Router;
  let location: Location;

  let modifiesMock: IFractal;
  let collectionsMock: IFractal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SidenavComponent,
        NoopAnimationsModule,
        RouterModule.forRoot([
          { path: '', component: DummyComponent },
          { path: 'simple', component: DummyComponent },
        ]),
      ],
      providers: [
        EventService,
        UpdateService,
        StatesService,
        FractalService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;

    loader = TestbedHarnessEnvironment.loader(fixture);
    router.initialNavigation();
  });

  beforeEach(() => {
    const parent = new Fractal();
    component.ss.currentFractal.set(parent);
    modifiesMock = new Fractal({ dto: appMock.fractals.Modifiers, parent });
    collectionsMock = new Fractal({ dto: appMock.fractals.Collections, parent });
  });

  describe('edit page is not activated', () => {
    it('should render the modifiers taps and the collections taps', async () => {
      component.ss.sidenavTaps.set(modifiesMock);
      const modifiersTaps = await loader.getAllHarnesses(MatButtonHarness);
      expect(modifiersTaps.length).toBe(4);

      component.ss.sidenavTaps.set(collectionsMock);
      const collectionsTaps = await loader.getAllHarnesses(MatButtonHarness);
      expect(collectionsTaps.length).toBe(2);
    });

    it('should disable the Edit, Delete and Save modifiers until some action happens', async () => {
      component.ss.sidenavTaps.set(modifiesMock);
      const modifiersTaps = await loader.getAllHarnesses(MatButtonHarness);
      for (const tap of modifiersTaps) {
        const text = await tap.getText();
        switch (text) {
          case CModifiers.New:
            expect(await tap.isDisabled()).toBeFalse();
            break;
          case CModifiers.Edit:
            expect(await tap.isDisabled()).toBeTrue();
            break;
          case CModifiers.Save:
            expect(await tap.isDisabled()).toBeTrue();
            break;
          case CModifiers.Delete:
            expect(await tap.isDisabled()).toBeTrue();
            break;
        }
      }
    });

    it('should activate the Edit and Delete modifiers when some children selected', async () => {
      component.ss.sidenavTaps.set(modifiesMock);
      component.ss.selectedChildren.set([
        new Fractal({ dto: appMock.fractals.Collections.fractals.Users.fractals[1] }),
      ]);
      const modifiersTaps = await loader.getAllHarnesses(MatButtonHarness);
      for (const tap of modifiersTaps) {
        const text = await tap.getText();
        switch (text) {
          case CModifiers.New:
            expect(await tap.isDisabled()).toBeFalse();
            break;
          case CModifiers.Edit:
            expect(await tap.isDisabled()).toBeFalse();
            break;
          case CModifiers.Save:
            expect(await tap.isDisabled()).toBeTrue();
            break;
          case CModifiers.Delete:
            expect(await tap.isDisabled()).toBeFalse();
            break;
        }
      }
    });

    it('should navigate to the edit page', async () => {
      component.ss.sidenavTaps.set(modifiesMock);
      component.ss.selectedChildren.set([
        new Fractal({ dto: appMock.fractals.Collections.fractals.Users.fractals[1] }),
      ]);
      const modifiersTaps = await loader.getAllHarnesses(MatButtonHarness);
      const taps: Record<string, MatButtonHarness> = {};

      for (const tap of modifiersTaps) {
        const text = await tap.getText();
        taps[text] = tap;
      }

      await taps[CModifiers.Edit].click();

      expect(location.path()).toContain(CModifiers.Edit);
      expect(location.path()).toContain(CAppFractals.Modifiers);

      await taps[CModifiers.New].click();

      expect(location.path()).toContain(CModifiers.New);
      expect(location.path()).toContain(CAppFractals.Modifiers);
    });
  });

  // describe('edit page is activated', () => {

  // })
});
