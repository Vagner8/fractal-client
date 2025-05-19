import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { IFractal } from '@types';
import { appMock, Fractal } from '@utils';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { EventService, FractalService, StatesService, UpdateService } from '@services';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { CAppFractals, CHoldThreshold, CModifiers } from '@constants';
import { Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dummy',
  standalone: true,
  template: '<div>DummyComponent</div>',
})
class DummyComponent {}

describe('SidenavComponent #', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let loader: HarnessLoader;

  let router: Router;
  let location: Location;

  let current: IFractal;
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

  beforeEach(async () => {
    current = new Fractal();
    component.ss.currentFractal.set(current);
    modifiesMock = new Fractal({ dto: appMock.fractals.Modifiers, parent: current });
    collectionsMock = new Fractal({ dto: appMock.fractals.Collections, parent: current });
    component.ss.sidenavTaps.set(modifiesMock);
  });

  describe('Edit page is not activated #', () => {
    it('Should render the modifiers taps and the collections taps', async () => {
      const modifiersTaps = await loader.getAllHarnesses(MatButtonHarness);
      expect(modifiersTaps.length).toBe(4);

      component.ss.sidenavTaps.set(collectionsMock);
      const collectionsTaps = await loader.getAllHarnesses(MatButtonHarness);
      expect(collectionsTaps.length).toBe(2);
    });

    it('Should disable the Edit, Save and Delete modifiers until some action happens', async () => {
      const newTap = await loader.getHarness(MatButtonHarness.with({ text: /new/i }));
      const editTap = await loader.getHarness(MatButtonHarness.with({ text: /edit/i }));
      const saveTap = await loader.getHarness(MatButtonHarness.with({ text: /save/i }));
      const deleteTap = await loader.getHarness(MatButtonHarness.with({ text: /delete/i }));
      expect(await newTap.isDisabled()).toBeFalse();
      expect(await editTap.isDisabled()).toBeTrue();
      expect(await saveTap.isDisabled()).toBeTrue();
      expect(await deleteTap.isDisabled()).toBeTrue();
    });

    it('Should activate the Edit and Delete modifiers when some children selected', async () => {
      component.ss.selectedChildren.set([
        new Fractal({ dto: appMock.fractals.Collections.fractals.Collections_2.fractals[1] }),
      ]);
      const newTap = await loader.getHarness(MatButtonHarness.with({ text: /new/i }));
      const editTap = await loader.getHarness(MatButtonHarness.with({ text: /edit/i }));
      const saveTap = await loader.getHarness(MatButtonHarness.with({ text: /save/i }));
      const deleteTap = await loader.getHarness(MatButtonHarness.with({ text: /delete/i }));
      expect(await newTap.isDisabled()).toBeFalse();
      expect(await editTap.isDisabled()).toBeFalse();
      expect(await saveTap.isDisabled()).toBeTrue();
      expect(await deleteTap.isDisabled()).toBeFalse();
    });

    it('Should navigate to the edit page', async () => {
      component.ss.selectedChildren.set([
        new Fractal({ dto: appMock.fractals.Collections.fractals.Collections_2.fractals[1] }),
      ]);
      const editTap = await loader.getHarness(MatButtonHarness.with({ text: /edit/i }));
      await editTap.click();

      expect(location.path()).toContain(CModifiers.Edit);
      expect(location.path()).toContain(CAppFractals.Modifiers);

      const newTap = await loader.getHarness(MatButtonHarness.with({ text: /new/i }));
      await newTap.click();

      expect(location.path()).toContain(CModifiers.New);
      expect(location.path()).toContain(CAppFractals.Modifiers);
    });
  });

  describe('Edit page is activated #', () => {
    beforeEach(() => {
      component.ss.$paramMap = signal({ get: () => CAppFractals.Modifiers } as any);
    });

    describe('New fractals #', () => {
      it('Should activate the Save modifier and run the saving process when any field is dirty', async () => {
        const saveSpy = spyOn(component['us'], 'save');
        const saveTap = await loader.getHarness(MatButtonHarness.with({ text: /save/i }));
        expect(await saveTap.isDisabled()).toBeTrue();
        component.ss.selectedChildren.dirtyFractals.push(new Fractal());
        const host = await saveTap.host();
        await host.dispatchEvent('pointerdown');
        await new Promise(resolve => setTimeout(resolve, CHoldThreshold));
        await host.dispatchEvent('pointerup');
        expect(saveSpy).toHaveBeenCalled();
      });

      it('', fakeAsync(() => {
        let a = 0;

        setTimeout(() => (a = 10), 1000);

        tick(1000);

        expect(a).toBe(10);
      }));
    });
  });
});
