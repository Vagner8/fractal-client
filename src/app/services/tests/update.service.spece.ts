import { IControl, IFractal } from '@types';
import { UpdateService } from '../update.service';
import { ControlFactory, Fractal } from '@utils';
import { FractalDto } from 'app/utils/fractal/factories/fractal-dto';
import { TestBed } from '@angular/core/testing';
import { DataService } from '../data.service';
import { StatesService } from '../states.service';
import { FractalService } from '../fractal.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('UpdateService', () => {
  let service: UpdateService;

  let fractalMock: IFractal;
  let controlsMock: IControl[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        StatesService,
        FractalService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(UpdateService);
  });

  beforeEach(() => {
    fractalMock = new Fractal(new FractalDto('parentId', {}));
    service['current'] = new Fractal(new FractalDto('parentId', {}));
    service['oc'] = ControlFactory(service['current']);
    service['occ'] = ControlFactory(service['current']);

    controlsMock = [
      ControlFactory(fractalMock, { indicator: 'indicator-test-1', data: 'data-test-1' }),
      ControlFactory(fractalMock, { indicator: 'indicator-test-2', data: 'data-test-2' }),
      ControlFactory(fractalMock, { indicator: 'indicator-test-3', data: 'data-test-3' }),
    ];
  });

  // describe('New', () => {});

  // describe('Edit', () => {});

  describe('Save', () => {
    // describe('saveFractals', () => {
    //   it('should', () => {});
    // });

    describe('saveControls', () => {
      beforeEach(() => {
        controlsMock.forEach(control => control.form.markAsDirty());
        fractalMock.newControls.set(controlsMock);
      });

      it('should disable the fullEditMode for all dirty controls', () => {
        fractalMock.newControls.value.forEach(control => control.fullEditMode.set(true));
        service['saveControls'](fractalMock);
        controlsMock.forEach(control => expect(control.fullEditMode.value).toBeFalse());
      });

      it('should disable the fullEditMode for all dirty controls', () => {
        fractalMock.newControls.value.forEach(control => control.fullEditMode.set(true));
        service['saveControls'](fractalMock);
        controlsMock.forEach(control => expect(control.fullEditMode.value).toBeFalse());
      });
    });

    // describe('saveNewFractals', () => {
    //   it('should set a new cursor to a new fractal', () => {
    //     service['oc'].dto.data = '1:3:5:4:2';
    //     fractalMock.cursor = 'empty cursor';

    //     service['saveNewFractals'](fractalMock);

    //     expect(fractalMock.cursor).toBe('6');
    //   });
    // });
  });
});
