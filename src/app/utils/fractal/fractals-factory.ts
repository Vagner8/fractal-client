import { Fractal, FractalCollection, FractalsDto, RecordFractals } from '@types';
import { FractalFactory } from './fractal-factory';
import { RecordFractalsFactory } from '../record/record-fractals-factory';
import { isCollection } from '../guards';
import { FractalCollectionFactory } from './fractal-collection-factory';

export const fractalsFactory = (fractalsDto: FractalsDto | null, parent: FractalCollection): RecordFractals => {
  const record = new RecordFractalsFactory();
  let fractal: Fractal;
  for (const indicator in fractalsDto) {
    const dto = fractalsDto[indicator];
    fractal = dto.fractals ? new FractalCollectionFactory({ parent, dto }) : new FractalFactory({ parent, dto });
    if (isCollection(fractal)) {
      fractal.fractals = fractalsFactory(fractalsDto[indicator].fractals, fractal);
    }
    record.set(indicator, fractal);
  }
  return record;
};
