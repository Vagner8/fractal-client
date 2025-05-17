import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { IFractal } from '@types';
import { FractalFactory } from '@utils';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { EventService, FractalService, StatesService, UpdateService } from '@services';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TapHarness } from '@components/atoms';
import { MatCardHarness } from '@angular/material/card/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HarnessLoader } from '@angular/cdk/testing';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;
  let nativeElement: HTMLElement;

  // let tapHarness: TapHarness;

  let esm: EventService;
  let usm: UpdateService;
  let ssm: StatesService;
  let fsm: FractalService;

  let modifiesMock: IFractal;
  let collectionsMock: IFractal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidenavComponent, NoopAnimationsModule],
      providers: [
        EventService,
        UpdateService,
        StatesService,
        FractalService,
        // { provide: EventService, useValue: esm },
        // { provide: UpdateService, useValue: usm },
        // { provide: StatesService, useValue: ssm },
        // { provide: FractalService, useValue: fsm },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  beforeEach(() => {
    esm = {} as EventService;
    usm = {} as UpdateService;
    ssm = {} as StatesService;
    fsm = {} as FractalService;
  });

  beforeEach(() => {
    const parent = FractalFactory({ dto: { id: 'id' } } as IFractal);
    modifiesMock = FractalFactory(parent, {
      fractalsData: [
        {
          controlsData: [{ data: 'New', indicator: 'Name' }],
        },
        {
          controlsData: [{ data: 'Edit', indicator: 'Name' }],
        },
        {
          controlsData: [{ data: 'Save', indicator: 'Name' }],
        },
        {
          controlsData: [{ data: 'Delete', indicator: 'Name' }],
        },
      ],
      controlsData: [{ data: 'Modifiers', indicator: 'Cursor' }],
    });
    collectionsMock = FractalFactory(parent, {
      fractalsData: [{ controlsData: [{ data: 'Users', indicator: 'Name' }] }],
      controlsData: [{ data: 'Collections', indicator: 'Cursor' }],
    });
  });

  it('should render the modifiers', async () => {
    component.modifiers = modifiesMock;
    await TestbedHarnessEnvironment.harnessForFixture(fixture, TapHarness);
    fixture.detectChanges();
    const taps = await rootLoader.getAllHarnesses(TapHarness);
    console.log('🚀 ~ taps:', modifiesMock.fractals);
    // expect(taps.length).toBe(4);
  });

  // describe('onModifierTouched', () => {});
});
