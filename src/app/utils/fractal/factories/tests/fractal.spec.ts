import { appMock } from '../../mocks';
import { Fractal } from '../fractal';

describe('Fractal #', () => {
  it('should be able to add new controls', () => {
    const parent = new Fractal({ dto: appMock.fractals.Collections.fractals.Collections_2 });
    const result = new Fractal({ parent, options: { populateFromOcc: true } });

    expect(result.newControls.value.length).toBe(2);
    result.newControls.value.forEach((control, index) =>
      expect(control.dto.indicator).toBe(`indicator_${String(index + 1)}`)
    );
  });
});
