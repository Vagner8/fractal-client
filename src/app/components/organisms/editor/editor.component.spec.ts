import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorComponent } from './editor.component';
import { StatesService } from '@services';
import { appMock, Fractal } from '@utils';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { IFractal } from '@types';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import { CWords } from '@constants';

describe('EditorComponent #', () => {
  let fixture: ComponentFixture<EditorComponent>;
  let component: EditorComponent;

  let loader: HarnessLoader;

  let current: IFractal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditorComponent, NoopAnimationsModule],
      providers: [StatesService, provideExperimentalZonelessChangeDetection()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  beforeEach(() => {
    current = new Fractal({ dto: appMock.fractals.Collections.fractals.Collections_2 });
    component.ss.currentFractal.set(current);
    component.ss.selectedChildren.push(new Fractal({ parent: current, options: { populateFromOcc: true } }));
    component.ss.selectedChildren.push(new Fractal({ parent: current, options: { populateFromOcc: true } }));
    component.ss.selectedChildren.push(new Fractal({ parent: current, options: { populateFromOcc: true } }));
  });

  it('should render the fractals forms', async () => {
    const fractalsFormsCards = await loader.getAllHarnesses(MatCardHarness);
    expect(fractalsFormsCards.length).toBe(3);
    expect(await fractalsFormsCards[0].getTitleText()).toBe(CWords.New);
    expect(await fractalsFormsCards[1].getTitleText()).toBe(CWords.New);
    expect(await fractalsFormsCards[2].getTitleText()).toBe(CWords.New);
  });

  it('Should render fractal forms with controls created by the parent Occ', async () => {
    const controlsInputs = await loader.getAllHarnesses(MatInputHarness);
    const controlsFields = await loader.getAllHarnesses(MatFormFieldHarness);

    expect(controlsFields.length).toBe(6);
    expect(controlsInputs.length).toBe(6);
    expect(await controlsFields[0].getLabel()).toBe('indicator_1');
    expect(await controlsInputs[0].getValue()).toBe('');
    expect(await controlsFields[1].getLabel()).toBe('indicator_2');
    expect(await controlsInputs[1].getValue()).toBe('');
  });

  it('should set the dirty controls and the dirty fractals when an field value was changed', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('value');

    expect(component.ss.selectedChildren.dirtyControls.isEmpty).toBeFalsy();
    expect(component.ss.selectedChildren.dirtyFractals.isEmpty).toBeFalsy();
  });
});
