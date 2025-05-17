import { IFractal } from '@types';
import { FractalFactory } from '../fractal-factory';

describe('FractalFactory', () => {
  const parent = FractalFactory({ dto: { id: 'id' } } as IFractal);

  it('should crate the fractal whit new controls when the controlsData provided', () => {
    const result = FractalFactory(parent, {
      controlsData: [
        { data: 'data-1', indicator: 'indicator-1' },
        { data: 'data-2', indicator: 'indicator-2' },
        { data: 'data-3', indicator: 'indicator-3' },
      ],
    });

    expect(result.newControls.value.length).toBe(3);
    result.newControls.value.forEach((control, index) => {
      expect(control.dto.data).toBe(`data-${index + 1}`);
      expect(control.dto.indicator).toBe(`indicator-${index + 1}`);
    });
  });

  it('should create the fractal with children when the fractalsData provided', () => {
    const result = FractalFactory(parent, {
      fractalsData: [
        {
          controlsData: [{ data: 'data-1', indicator: 'indicator-1' }],
        },
        {
          controlsData: [{ data: 'data-2', indicator: 'indicator-2' }],
        },
        {
          controlsData: [{ data: 'data-3', indicator: 'indicator-3' }],
        },
      ],
    });

    for (let index = 1; index <= 3; index++) {
      const fractal1 = result.fractals.get(String(index));
      expect(fractal1?.dto.controls[`indicator-${index}`].data).toBe(`data-${index}`);
      expect(fractal1?.form.controls[`indicator-${index}`].value).toEqual({
        indicator: `indicator-${index}`,
        field: 'Text',
        data: `data-${index}`,
      });
    }
  });

  it('should crate the fractal whit new controls when the indicators provided', () => {
    const result = FractalFactory(parent, { indicators: ['indicator-1', 'indicator-2', 'indicator-3'] });

    expect(result.newControls.value.length).toBe(3);
    result.newControls.value.forEach((control, index) => {
      expect(control.dto.data).toBe('');
      expect(control.dto.indicator).toBe(`indicator-${index + 1}`);
    });
  });
});
