import { UpdateService } from '../update.service';
import { Fractal } from '@utils';
import { TestBed } from '@angular/core/testing';
import { DataService } from '../data.service';
import { StatesService } from '../states.service';
import { FractalService } from '../fractal.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('UpdateService #', () => {
  let service: UpdateService;

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
    service['ss'].currentFractal.set(new Fractal());
  });

  describe('New #', () => {
    it('New', () => {});
  });

  // describe('Edit', () => {});
});
