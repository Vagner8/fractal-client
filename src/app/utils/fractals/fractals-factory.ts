import { Fractal, FractalsDto, FractalsRecord } from '@types';
import { FractalsRecordFactory } from './fractals-record-factory';
import { FractalFactory } from './fractal-factory';

export const FractalsFactory = (fractalsDto: FractalsDto | null, parent: Fractal): FractalsRecord => {
  const record = new FractalsRecordFactory();
  let fractal: Fractal;
  for (const indicator in fractalsDto) {
    const dto = fractalsDto[indicator];
    fractal = new FractalFactory(dto, parent);
    fractal.fractals = FractalsFactory(fractalsDto[indicator].fractals, fractal);
    record.set(indicator, fractal);
  }
  return record;
};
